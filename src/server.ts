import express from 'express';
import dotenv from 'dotenv';
import routes from './routes'; // ✅ FIXED: import default router

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes); // ✅ Using the Router function

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
