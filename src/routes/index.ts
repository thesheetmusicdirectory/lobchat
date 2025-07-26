// src/routes/index.ts
import express from 'express';
import chatRoutes from './chatRoutes';

const router = express.Router();

router.use('/', chatRoutes); // Mount at root (so /messages works)

export default router;
