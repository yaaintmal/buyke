import ShoppingItem, { IShoppingItem } from '../models/ShoppingItem';

export interface CreateItemInput {
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
  listId?: string | null;
}

export interface UpdateItemInput {
  bought?: boolean;
  quantity?: number;
  unit?: string;
  category?: string;
}

export const getAll = async (listId?: string): Promise<IShoppingItem[]> => {
  const query = listId ? { listId } : {};
  return ShoppingItem.find(query).sort({ createdAt: -1 });
};

export const createItem = async (input: CreateItemInput): Promise<IShoppingItem> => {
  const item = new ShoppingItem({
    name: input.name,
    quantity: input.quantity ?? 1,
    unit: input.unit ?? 'pcs',
    category: input.category ?? 'Other',
    listId: input.listId ?? null,
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

export const deleteAll = async (listId?: string): Promise<void> => {
  const query = listId ? { listId } : {};
  await ShoppingItem.deleteMany(query);
};
