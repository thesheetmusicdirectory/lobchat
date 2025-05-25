import express from 'express';
import chatRoutes from './chatRoutes'; // Import your chat routes

const router = express.Router();

// Use the chat routes under the `/api/chat` path
router.use('/api/chat', chatRoutes);

// Example route for testing
router.get('/', (req, res) => {
  res.send('Welcome to LobChat!');
});

export default router;