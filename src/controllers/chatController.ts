import { Request, Response } from 'express';

let messages: { user: string; text: string }[] = [];

export const getMessages = (req: Request, res: Response) => {
  res.json(messages);
};

export const postMessage = (req: Request, res: Response) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: 'User and text are required' });
  }
  messages.push({ user, text });
  res.status(201).json({ message: 'Message added' });
};