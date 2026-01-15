import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  name: string;
  bought: boolean;
  createdAt: Date;
}

const ShoppingItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  bought: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ShoppingItem = mongoose.model<IShoppingItem>('ShoppingItem', ShoppingItemSchema);

export default ShoppingItem;
