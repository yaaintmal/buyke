import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/buyke';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose Model
interface IShoppingItem extends Document {
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

// Routes

// GET /items
app.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await ShoppingItem.find().sort({ createdAt: -1 }); // Newest first
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST /items
app.post('/items', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = new ShoppingItem({ name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// PUT /items/:id (update bought status)
app.put('/items/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { bought } = req.body;

    if (typeof bought !== 'boolean') {
      return res.status(400).json({ error: 'Bought status must be a boolean' });
    }

    const updatedItem = await ShoppingItem.findByIdAndUpdate(id, { bought }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE /items/:id
app.delete('/items/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedItem = await ShoppingItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Start Server
app.listen(PORT, () => {
  // Print server and Mongo URI on separate lines to avoid concatenation/escaped newlines
  // Redact credentials in the URI (if present) to avoid leaking secrets
  const redactMongoUri = (uri: string) => {
    try {
      const lastAt = uri.lastIndexOf('@');
      if (lastAt === -1) return uri; // no credentials present
      const protocolEnd = uri.indexOf('://');
      const start = protocolEnd !== -1 ? protocolEnd + 3 : 0;
      return uri.slice(0, start) + '*****@' + uri.slice(lastAt + 1);
    } catch {
      return 'redacted';
    }
  };

  console.log(`🛒 Server is running on port ${PORT}`);
  console.log(`MONGO_URI=${redactMongoUri(MONGO_URI)} 🛒`);
});
