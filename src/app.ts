import express from 'express';
import { cors } from './middlewares/cors.js';
import { getProductController, postProductController } from './controllers/ProductController.js';

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
app.use(express.json());
app.get('/product', getProductController);
app.post('/product', postProductController);
app.get('*', (req, res) => {
  res.status(404).send('<h2>Page not found</h2>');
});
