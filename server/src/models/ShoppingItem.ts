import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  name: string;
  bought: boolean;
  quantity: number;
  unit: string;
  category: string;
  createdAt: Date;
}

const ShoppingItemSchema = new Schema({
  name: { type: String, required: true },
  bought: { type: Boolean, default: false },
  quantity: { type: Number, default: 1, min: 0.1 },
  unit: { type: String, default: 'pcs' },
  category: { type: String, default: 'Other' },
  listId: { type: String, default: null, index: true },
  createdAt: { type: Date, default: Date.now },
});

const ShoppingItem = (mongoose as any).model('ShoppingItem', ShoppingItemSchema);

export default ShoppingItem;
