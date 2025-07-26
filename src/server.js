const express = require('express');
const http = require('http'); // Required for Socket.IO
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app); // wrap Express in HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend from any origin
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

// Enable CORS (so frontend can connect)
app.use(cors());

// Serve a basic message
app.get('/', (req, res) => {
  res.send('LobChat backend is running.');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('📨 Message received:', msg);
    io.emit('chat message', msg); // broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 LobChat server running on http://localhost:${PORT}`);
});
