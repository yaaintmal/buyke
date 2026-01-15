import { useState, useEffect, useLayoutEffect } from 'react';
import { type ShoppingItem, fetchItems, createItem, updateItemStatus, deleteItem } from './api';
import Header from './components/Header';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import ErrorBanner from './components/ErrorBanner';
import Dock, { type FilterType } from './components/Dock';
import Settings from './components/Settings';
import Footer from './components/Footer';

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [filter, setFilter] = useState<FilterType>('all');
  const [showSettings, setShowSettings] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const s = localStorage.getItem('theme');
      return s === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
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
    try {
      setAdding(true);
      const newItem = await createItem(name);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      console.error(err);
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

  const filteredItems = items.filter((it) => {
    if (filter === 'all') return true;
    if (filter === 'open') return !it.bought;
    return it.bought;
  });

  return (
    <div className="app-root">
      <div className="card">
        <Header openCount={items.filter((i) => !i.bought).length} />

        <AddItemForm onAdd={handleAdd} adding={adding} />

        {error && <ErrorBanner message={error} />}

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
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
