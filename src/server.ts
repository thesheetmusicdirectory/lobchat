import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import routes from './routes';
import { clearMessages } from './controllers/chatController';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));  // serve frontend
app.use(routes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('📨 Message:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

socket.on('typing', (username) => {
  socket.broadcast.emit('typing', username);
});

socket.on('stop typing', (username) => {
  socket.broadcast.emit('stop typing', username);
});


server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

// ✅ Clear messages every 30 minutes (1800000 ms)
setInterval(clearMessages, 30 * 60 * 1000);