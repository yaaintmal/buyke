import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import useShoppingList from '../useShoppingList';

// Mock the API module to return a small list quickly (this test is fast and does not rely on network)
vi.mock('../../api', () => ({
  fetchItems: vi.fn().mockResolvedValue([
    { _id: '1', name: 'Apples', bought: false, createdAt: new Date().toISOString() },
    { _id: '2', name: 'Bananas', bought: true, createdAt: new Date().toISOString() },
  ]),
}));

// A small component to surface hook outputs for testing
function TestComponent() {
  const { items, loading } = useShoppingList();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <ul>
        {items.map((it) => (
          <li key={it._id}>{it.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe('useShoppingList (unit)', () => {
  it('loads and renders items from the API', async () => {
    render(<TestComponent />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Apples')).toBeInTheDocument());
    expect(screen.getByText('Bananas')).toBeInTheDocument();
  });
});
