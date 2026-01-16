import { api } from './lib/apiClient';

export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  quantity: number;
  unit: string;
  category: string;
  createdAt: string;
}

export interface CreateItemPayload {
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
}

export interface UpdateItemPayload {
  name?: string;
  bought?: boolean;
  quantity?: number;
  unit?: string;
  category?: string;
}

export const fetchItems = async (): Promise<ShoppingItem[]> => {
  const response = await api.get('/items');
  return response.data;
};

export const createItem = async (payload: CreateItemPayload): Promise<ShoppingItem> => {
  const response = await api.post('/items', payload);
  return response.data;
};

export const updateItemStatus = async (
  id: string,
  updates: UpdateItemPayload,
): Promise<ShoppingItem> => {
  const response = await api.put(`/items/${id}`, updates);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};

export const deleteAllItems = async (): Promise<void> => {
  await api.delete('/items');
};
