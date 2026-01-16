import ShoppingItem, { IShoppingItem } from '../models/ShoppingItem';

export interface CreateItemInput {
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
}

export interface UpdateItemInput {
  bought?: boolean;
  quantity?: number;
  unit?: string;
  category?: string;
}

export const getAll = async (): Promise<IShoppingItem[]> => {
  return ShoppingItem.find().sort({ createdAt: -1 });
};

export const createItem = async (input: CreateItemInput): Promise<IShoppingItem> => {
  const item = new ShoppingItem({
    name: input.name,
    quantity: input.quantity ?? 1,
    unit: input.unit ?? 'pcs',
    category: input.category ?? 'Other',
  });
  await item.save();
  return item;
};

export const updateStatus = async (
  id: string,
  updates: UpdateItemInput,
): Promise<IShoppingItem | null> => {
  return ShoppingItem.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteById = async (id: string): Promise<IShoppingItem | null> => {
  return ShoppingItem.findByIdAndDelete(id);
};

export const deleteAll = async (): Promise<void> => {
  await ShoppingItem.deleteMany({});
};
