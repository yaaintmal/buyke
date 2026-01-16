import { useEffect, useState, useCallback } from 'react';
import type { ShoppingItem } from '../api';
import { fetchItems, createItem, updateItemStatus, deleteItem, deleteAllItems } from '../api';

export const useShoppingList = () => {
  const [items, setItems] = useState<(ShoppingItem & { pending?: boolean })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState<boolean>(false);

  const loadItems = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleAdd = useCallback(async (name: string) => {
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
      setItems((prev) => [pendingItem, ...prev]);

      const newItem = await createItem(name);

      setItems((prev) => prev.map((it) => (it._id === tempId ? newItem : it)));
    } catch (err) {
      console.error(err);
      setItems((prev) => prev.filter((it) => it._id !== tempId));
      setError('Failed to add item.');
    } finally {
      setAdding(false);
    }
  }, []);

  const handleToggle = useCallback(
    async (id: string, currentStatus: boolean) => {
      try {
        setItems((prev) =>
          prev.map((item) => (item._id === id ? { ...item, bought: !currentStatus } : item)),
        );
        await updateItemStatus(id, !currentStatus);
      } catch (err) {
        console.error(err);
        setError('Failed to update item.');
        loadItems();
      }
    },
    [loadItems],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setItems((prev) => prev.filter((item) => item._id !== id));
        await deleteItem(id);
      } catch (err) {
        console.error(err);
        setError('Failed to delete item.');
        loadItems();
      }
    },
    [loadItems],
  );

  const handleFactoryReset = useCallback(async () => {
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
      // ensure server state matches
      loadItems();
    }
  }, [loadItems]);

  return {
    items,
    loading,
    error,
    adding,
    loadItems,
    handleAdd,
    handleToggle,
    handleDelete,
    handleFactoryReset,
  } as const;
};

export default useShoppingList;
