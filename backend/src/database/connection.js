const knex = require('knex');
const configuration = require('../../knexfile');

// Testa a variável de ambiante NODE_ENV, setada no package.json
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;