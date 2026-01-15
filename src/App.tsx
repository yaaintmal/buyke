import { useState, useEffect } from 'react';
import { type ShoppingItem, fetchItems, createItem, updateItemStatus, deleteItem } from './api';
import Header from './components/Header';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import ErrorBanner from './components/ErrorBanner';

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

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
      setItems((prev) => prev.map((item) => (item._id === id ? { ...item, bought: !currentStatus } : item)));
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

  return (
    <div className="app-root">
      <div className="card">
        <Header openCount={items.filter(i => !i.bought).length} />

        <AddItemForm onAdd={handleAdd} adding={adding} />

        {error && <ErrorBanner message={error} />}

        <ItemList items={items} loading={loading} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;