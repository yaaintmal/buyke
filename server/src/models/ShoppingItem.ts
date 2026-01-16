import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  name: string;
  bought: boolean;
  createdAt: Date;
}

const ShoppingItemSchema = new Schema({
  name: { type: String, required: true },
  bought: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ShoppingItem = (mongoose as any).model('ShoppingItem', ShoppingItemSchema);

export default ShoppingItem;
