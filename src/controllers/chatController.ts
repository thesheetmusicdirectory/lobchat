// src/controllers/chatController.ts
import { Request, Response } from 'express';

let messages: { user: string; text: string }[] = [];

export const getMessages = (req: Request, res: Response): void => {
  console.log('GET /messages');
  res.json(messages);
};

export const postMessage = (req: Request, res: Response): void => {
  const { user, text } = req.body;
  if (!user || !text) {
    res.status(400).json({ error: 'User and text are required' });
    return;
  }
  messages.push({ user, text });
  res.status(201).json({ message: 'Message added' });
};
// ✅ Add this function
export const clearMessages = () => {
  messages = [];
  console.log('🧹 Chat messages cleared');
};