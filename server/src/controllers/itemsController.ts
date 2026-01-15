import { Request, Response, NextFunction } from 'express';
import * as service from '../services/itemsService';
import { createItemSchema, updateItemSchema, idParamSchema } from '../schemas/itemsSchema';
import { HttpError } from '../middleware/errorHandler';

export const getItems = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name } = createItemSchema.parse(req.body);
    const item = await service.createItem(name);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const { bought } = updateItemSchema.parse(req.body);

    const updated = await service.updateStatus(id, bought);
    if (!updated) {
      throw new HttpError(404, 'Item not found');
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const deleted = await service.deleteById(id);
    if (!deleted) {
      throw new HttpError(404, 'Item not found');
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const deleteAllItems = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await service.deleteAll();
    res.json({ message: 'All items deleted successfully' });
  } catch (err) {
    next(err);
  }
};
