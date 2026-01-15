import { api } from './lib/apiClient';

export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: string;
}

export const fetchItems = async (): Promise<ShoppingItem[]> => {
  const response = await api.get('/items');
  return response.data;
};

export const createItem = async (name: string): Promise<ShoppingItem> => {
  const response = await api.post('/items', { name });
  return response.data;
};

export const updateItemStatus = async (id: string, bought: boolean): Promise<ShoppingItem> => {
  const response = await api.put(`/items/${id}`, { bought });
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};

export const deleteAllItems = async (): Promise<void> => {
  await api.delete('/items');
};
