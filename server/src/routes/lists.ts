import { Router } from 'express';
import mongoose from 'mongoose';
import List from '../models/List';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const list = new List({ name: name ?? 'Untitled list' });
    await list.save();
    res.status(201).json({ id: list._id.toString(), name: list.name });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: 'Not found (invalid ID)' });
    }
    const list = await List.findById(id);
    if (!list) return res.status(404).json({ error: 'Not found' });
    res.json({ id: list._id.toString(), name: list.name });
  } catch (err) {
    next(err);
  }
});

export default router;
