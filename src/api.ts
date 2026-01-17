import { api } from './lib/apiClient';
import type { Unit } from '../shared/units';

export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  quantity: number;
  unit: Unit;
  category: string;
  createdAt: string;
}

export interface CreateItemPayload {
  name: string;
  quantity?: number;
  unit?: Unit;
  category?: string;
  listId?: string | null;
}

export interface UpdateItemPayload {
  name?: string;
  bought?: boolean;
  quantity?: number;
  unit?: Unit;
  category?: string;
}

export const fetchItems = async (listId?: string): Promise<ShoppingItem[]> => {
  const response = await api.get('/items', { params: listId ? { listId } : undefined });
  return response.data;
};

export const createList = async (name?: string): Promise<{ id: string; name?: string }> => {
  const response = await api.post('/lists', { name });
  // If the backend for any reason doesn't return an id, fall back to a client-side UUID-like id
  const id =
    response.data?.id ??
    (typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? (crypto as unknown as { randomUUID: () => string }).randomUUID()
      : `uuid-${Math.random().toString(36).slice(2, 10)}`);
  return { id, name: response.data?.name ?? name };
};

export const getList = async (id: string): Promise<{ id: string; name?: string }> => {
  const response = await api.get(`/lists/${id}`);
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

export const deleteAllItems = async (listId?: string): Promise<void> => {
  await api.delete('/items', { params: listId ? { listId } : undefined });
};
