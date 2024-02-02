const express = require('express');
const cors = require('./middlewares/cors');
const rateApi = require('./utils/RateApi');
const formattedDate = require('./utils/DataHandler');
const arrayHandler = require('./utils/ArrayHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

const getRate = (req, res) => {
  // Get id USA dollar from currency list by name, because id changes
  rateApi.getDollarIdList()
    .then(currentIdList => {
      const id = arrayHandler.findDollarId(currentIdList);

      // Then get rate USA dollar by id from rates list, that requested by current date
      rateApi.getRateList(formattedDate)
        .then(currentRate => {
          const rate = arrayHandler.findDollarRate(currentRate, id);
          res.json(arrayHandler.setPrice(rate));
        })
        .catch(err => {
        res.status(500).send(`Ошибка: ${err}`);
      });
    })
    .catch(err => {
      res.status(500).send(`Ошибка: ${err}`);
    });
}

app.get('/product', getRate);

app.get('*', (req, res) => {
  res.status(404).send('<h2>Page not found</h2>');
});
