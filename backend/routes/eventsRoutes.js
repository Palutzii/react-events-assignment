import express from 'express';
const router = express.Router();

import { getAllEvents, getEventById } from '../controllers/eventsController.js';

router.get('/api/events', getAllEvents);
router.get('/api/events/:id', getEventById);

export default router;