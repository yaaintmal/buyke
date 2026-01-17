import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Item from '../Item';
import type { ShoppingItem } from '../../api';
import { vi } from 'vitest';

// Mutable language for tests
let currentLang: 'de' | 'en' = 'de';
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    lang: currentLang,
    setLang: (l: 'de' | 'en') => {
      currentLang = l;
    },
  }),
}));

describe('Item component — edit mode translations', () => {
  const baseItem: ShoppingItem = {
    _id: 'item-1',
    name: 'Apple',
    quantity: 1,
    unit: 'pcs',
    category: 'Produce',
    bought: false,
    createdAt: new Date().toISOString(),
  };

  test('shows translated unit and category option labels in edit form', async () => {
    currentLang = 'de';
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    const onUpdate = vi.fn().mockResolvedValue(undefined);

    render(
      <ul>
        <Item item={{ ...baseItem }} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      </ul>,
    );

    // Click the edit button to enter edit mode
    const editButton = screen.getByRole('button', { name: /bearbeiten/i });
    fireEvent.click(editButton);

    // Wait for the selects to appear
    await waitFor(() => {
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThanOrEqual(2);
    });

    // Find option elements by value and assert their visible text is translated (German)
    const pcsOption = screen.getByRole('option', { name: /stück/i, hidden: false });
    expect(pcsOption).toHaveValue('pcs');

    // New unit should be present
    const sliceOption = screen.getByRole('option', { name: /scheibe|slice/i, hidden: false });
    expect(sliceOption).toHaveValue('slice');

    const produceOption = screen.getByRole('option', { name: /obst/i, hidden: false });
    expect(produceOption).toHaveValue('Produce');
  });

  test('falls back to constant labels when translation missing', async () => {
    currentLang = 'de';
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    const onUpdate = vi.fn().mockResolvedValue(undefined);

    // Remove German translations for pcs and Produce to force fallback
    type I18n = {
      translations: Record<
        string,
        { units?: Record<string, string>; categories?: Record<string, string> }
      >;
    };
    const i18n = (await import('../../i18n')) as unknown as I18n;
    const origPcs = i18n.translations.de.units!.pcs;
    const origProduce = i18n.translations.de.categories!.Produce;
    delete i18n.translations.de.units!.pcs;
    delete i18n.translations.de.categories!.Produce;

    try {
      render(
        <ul>
          <Item
            item={{ ...baseItem }}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </ul>,
      );

      // Click the edit button to enter edit mode
      const editButton = screen.getByRole('button', { name: /bearbeiten/i });
      fireEvent.click(editButton);

      // Wait for the selects to appear
      await waitFor(() => {
        const selects = screen.getAllByRole('combobox');
        expect(selects.length).toBeGreaterThanOrEqual(2);
      });

      // Since German translations were removed, expect fallback to constant labels (English)
      const pcsOption = screen.getByRole('option', { name: /pieces/i });
      expect(pcsOption).toHaveValue('pcs');

      const produceOption = screen.getByRole('option', { name: /Produce/i });
      expect(produceOption).toHaveValue('Produce');
    } finally {
      // Restore translations
      i18n.translations.de.units!.pcs = origPcs;
      i18n.translations.de.categories!.Produce = origProduce;
    }
  });
});
