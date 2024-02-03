import express from 'express';
import {cors} from './middlewares/cors';
import { getProductController, postProductController } from './controllers/ProductController';

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
app.use(express.json());
app.get('/product', getProductController);
app.post('/product', postProductController);
app.get('*', (req, res) => {
  res.status(404).send('<h2>Page not found</h2>');
});

function sayMyName(name: string): void {
    if (name === "Heisenberg") {
        console.log("You're right 👍");
    } else {
        console.log("You're wrong 👎");
    }
}

sayMyName("Heisenberg");

const message: string = 'Hello node!'
console.log(message)
