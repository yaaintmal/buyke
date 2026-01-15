import ShoppingItem, { IShoppingItem } from '../models/ShoppingItem';

export const getAll = async (): Promise<IShoppingItem[]> => {
  return ShoppingItem.find().sort({ createdAt: -1 });
};

export const createItem = async (name: string): Promise<IShoppingItem> => {
  const item = new ShoppingItem({ name });
  await item.save();
  return item;
};

export const updateStatus = async (id: string, bought: boolean): Promise<IShoppingItem | null> => {
  return ShoppingItem.findByIdAndUpdate(id, { bought }, { new: true });
};

export const deleteById = async (id: string): Promise<IShoppingItem | null> => {
  return ShoppingItem.findByIdAndDelete(id);
};

export const deleteAll = async (): Promise<void> => {
  await ShoppingItem.deleteMany({});
};
