import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: string;
}

export const fetchItems = async (): Promise<ShoppingItem[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (name: string): Promise<ShoppingItem> => {
  const response = await axios.post(API_URL, { name });
  return response.data;
};

export const updateItemStatus = async (id: string, bought: boolean): Promise<ShoppingItem> => {
  const response = await axios.put(`${API_URL}/${id}`, { bought });
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
