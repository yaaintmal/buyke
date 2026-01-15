import { Request, Response } from 'express';
import * as service from '../services/itemsService';

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    const item = await service.createItem(name);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { bought } = req.body;
    if (typeof bought !== 'boolean') {
      res.status(400).json({ error: 'Bought status must be a boolean' });
      return;
    }

    const updated = await service.updateStatus(id, bought);
    if (!updated) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const deleted = await service.deleteById(id);
    if (!deleted) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

export const deleteAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    await service.deleteAll();
    res.json({ message: 'All items deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete items' });
  }
};
