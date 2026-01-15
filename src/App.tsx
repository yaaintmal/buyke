import { useState, useEffect, useLayoutEffect } from 'react';
import {
  type ShoppingItem,
  fetchItems,
  createItem,
  updateItemStatus,
  deleteItem,
  deleteAllItems,
} from './api';
import Header from './components/Header';
import { LanguageProvider } from './contexts/LanguageContext';
import { AvatarProvider } from './contexts/AvatarContext';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import ErrorBanner from './components/ErrorBanner';
import Dock, { type FilterType } from './components/Dock';
import Settings from './components/Settings';
import Footer from './components/Footer';

function App() {
  const [items, setItems] = useState<(ShoppingItem & { pending?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [filter, setFilter] = useState<FilterType>('all');
  const [showSettings, setShowSettings] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'light') return 'light';
      if (s === 'dark') return 'dark';
      // No stored preference — prefer the user's system setting if available
      if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
      }
      // Fallback default for first-time visitors
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // apply theme class and persist synchronously before paint to avoid flash
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('theme-dark');
    else root.classList.remove('theme-dark');

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load items. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (name: string) => {
    const tempId = `pending-${Date.now()}`;
    const pendingItem: ShoppingItem & { pending?: boolean } = {
      _id: tempId,
      name,
      bought: false,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    try {
      setAdding(true);
      // insert a pending placeholder with reserved height to avoid layout shift
      setItems((prev) => [pendingItem, ...prev]);

      const newItem = await createItem(name);

      // replace pending placeholder with real item
      setItems((prev) => prev.map((it) => (it._id === tempId ? newItem : it)));
    } catch (err) {
      console.error(err);
      // remove pending placeholder
      setItems((prev) => prev.filter((it) => it._id !== tempId));
      setError('Failed to add item.');
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, bought: !currentStatus } : item)),
      );
      await updateItemStatus(id, !currentStatus);
    } catch (err) {
      console.error(err);
      setError('Failed to update item.');
      // revert
      loadItems();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setItems((prev) => prev.filter((item) => item._id !== id));
      await deleteItem(id);
    } catch (err) {
      console.error(err);
      setError('Failed to delete item.');
      loadItems();
    }
  };

  const handleFactoryReset = async () => {
    try {
      setLoading(true);
      await deleteAllItems();
      setItems([]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to reset items.');
    } finally {
      setLoading(false);
      setShowSettings(false);
      // reload to ensure server state matches
      loadItems();
    }
  };

  const filteredItems = items.filter((it) => {
    if (filter === 'all') return true;
    if (filter === 'open') return !it.bought;
    return it.bought;
  });

  return (
    <LanguageProvider>
      <AvatarProvider>
        <div className="app-root">
          <div className="card">
            <Header openCount={items.filter((i) => !i.bought).length} />

            <main>
              <AddItemForm onAdd={handleAdd} adding={adding} />

              <div className="banner-area" aria-live="polite">
                {error && <ErrorBanner message={error} />}
              </div>

              <Dock active={filter} onChange={setFilter} onSettings={() => setShowSettings(true)} />

              <ItemList
                items={filteredItems}
                totalItems={items.length}
                filter={filter}
                loading={loading}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />

              <Settings
                open={showSettings}
                onClose={() => setShowSettings(false)}
                theme={theme}
                onThemeChange={(t) => setTheme(t)}
                onFactoryReset={handleFactoryReset}
              />
            </main>

            <Footer />
          </div>
        </div>
      </AvatarProvider>
    </LanguageProvider>
  );
}

export default App;
