import mongoose, { Schema, Document } from 'mongoose';

export interface IList extends Document {
  name?: string;
  createdAt: Date;
}

const ListSchema = new Schema({
  name: { type: String, default: 'Untitled list' },
  createdAt: { type: Date, default: Date.now },
});

const List = (mongoose as any).model('List', ListSchema);

export default List;
