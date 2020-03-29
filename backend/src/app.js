const express = require('express'); // importação de pacotes
const cors = require('cors'); // importação do CORS
const { errors } = require('celebrate');
const routes = require('./routes'); // importação de arquivos ('./')

const app = express();

app.use(cors());
// definindo que os request serão no formato JSON
app.use(express.json());

app.use(routes);
app.use(errors());

module.exports = app;
