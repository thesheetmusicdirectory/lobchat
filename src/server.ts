import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes'; // Ensure the path is correct

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// REST API Routes
app.use('/api/chat', chatRoutes); // Ensure chatRoutes is a valid router

// Start HTTP server
app.listen(PORT, () => {
  console.log(`LobChat server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});
console.log(chatRoutes);