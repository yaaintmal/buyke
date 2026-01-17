import { Request, Response, NextFunction } from 'express';
import * as service from '../services/itemsService';
import { createItemSchema, updateItemSchema, idParamSchema } from '../schemas/itemsSchema';
import { HttpError } from '../middleware/errorHandler';
import { normalizeUnit } from '../shared/units';

export const getItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listId = req.query.listId as string | undefined;
    const items = await service.getAll(listId);
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
    // normalize unit aliases to canonical values before validation
    if (req.body && req.body.unit) {
      const normalized = normalizeUnit(req.body.unit);
      if (normalized) req.body.unit = normalized;
    }

    const payload = createItemSchema.parse(req.body);
    const item = await service.createItem(payload);
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

    // normalize unit aliases to canonical values before validation
    if (req.body && req.body.unit) {
      const normalized = normalizeUnit(req.body.unit);
      if (normalized) req.body.unit = normalized;
    }

    const updates = updateItemSchema.parse(req.body);

    const updated = await service.updateStatus(id, updates);
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
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const listId = req.query.listId as string | undefined;
    await service.deleteAll(listId);
    res.json({ message: 'All items deleted successfully' });
  } catch (err) {
    next(err);
  }
};
