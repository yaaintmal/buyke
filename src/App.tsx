import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, ShoppingCart, Loader2 } from 'lucide-react';
import { type ShoppingItem, fetchItems, createItem, updateItemStatus, deleteItem } from './api';

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
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

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      setAdding(true);
      const newItem = await createItem(newItemName);
      setItems((prev) => [newItem, ...prev]);
      setNewItemName('');
    } catch (err) {
      console.error(err);
      setError('Failed to add item.');
    } finally {
      setAdding(false);
    }
  };

  const handleToggleBought = async (id: string, currentStatus: boolean) => {
    try {
      // Optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, bought: !currentStatus } : item
        )
      );
      await updateItemStatus(id, !currentStatus);
    } catch (err) {
      console.error(err);
      setError('Failed to update item.');
      // Revert on failure
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, bought: currentStatus } : item
        )
      );
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      // Optimistic update
      setItems((prev) => prev.filter((item) => item._id !== id));
      await deleteItem(id);
    } catch (err) {
      console.error(err);
      setError('Failed to delete item.');
      loadItems(); // Revert/Reload
    }
  };

  return (
    <div className="app-root">
      <div className="card">
        <header className="card-header">
          <div className="header-left">
            <div className="logo"><ShoppingCart className="icon" /></div>
            <h1 className="title">Einkaufsliste</h1>
          </div>
          <div className="count">{items.filter(i => !i.bought).length} offen</div>
        </header>

        <form onSubmit={handleAddItem} className="form">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Was brauchst du?"
            className="input"
          />
          <button
            type="submit"
            disabled={adding || !newItemName.trim()}
            className="add-button"
            aria-disabled={adding || !newItemName.trim()}
          >
            {adding ? <Loader2 className="icon spin" /> : <Plus className="icon" />}
          </button>
        </form>

        {error && (
          <div className="error">⚠️ {error}</div>
        )}

        <div className="list">
          {loading ? (
            <div className="loading"><Loader2 className="icon spin large" /><p>Lade Einkäufe...</p></div>
          ) : items.length === 0 ? (
            <div className="empty">
              <div className="empty-illustration"><ShoppingCart className="icon large muted" /></div>
              <p className="empty-title">Deine Liste ist leer</p>
              <p className="empty-sub">Füge oben Produkte hinzu, die du einkaufen möchtest.</p>
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <li
                  key={item._id}
                  className={item.bought ? 'list-item bought' : 'list-item'}
                  onClick={() => handleToggleBought(item._id, item.bought)}
                >
                  <div className="item-left">
                    <div className={item.bought ? 'checkbox bought' : 'checkbox'}>
                      <Check className={item.bought ? 'icon check visible' : 'icon check hidden'} strokeWidth={3} />
                    </div>

                    <span className={item.bought ? 'item-name bought' : 'item-name'}>{item.name}</span>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item._id); }}
                    className="delete-button"
                    title="Löschen"
                  >
                    <Trash2 className="icon" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;