const express = require('express');
const cors = require('./middlewares/cors');
const getFormattedProduct = require('./controllers/ProductController');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

app.get('/product', getFormattedProduct);

app.get('*', (req, res) => {
  res.status(404).send('<h2>Page not found</h2>');
});
