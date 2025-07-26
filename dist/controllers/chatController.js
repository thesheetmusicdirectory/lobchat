"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getMessages = void 0;
let messages = [];
const getMessages = (req, res) => {
    res.json(messages);
};
exports.getMessages = getMessages;
const postMessage = (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) {
        res.status(400).json({ error: 'User and text are required' });
        return;
    }
    messages.push({ user, text });
    res.status(201).json({ message: 'Message added' });
};
exports.postMessage = postMessage;
