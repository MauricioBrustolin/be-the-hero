const express = require('express');

const routes = express.Router();

// importa a controller ONGS
const OngController = require('./controllers/OngController');
// importa a controller INCIDENTS
const IncidentController = require('./controllers/IncidentController');
// importa a controller PROFILE
const ProfileController = require('./controllers/ProfileController');
// importa a controller SESSION
const SessionController = require('./controllers/SessionController');

// LOGIN - Criar uma session
routes.post('/sessions', SessionController.create);

// ONGS

// Rota para listar ONGS
routes.get('/ongs', OngController.index);

// Rota para inserir ONGS
routes.post('/ongs', OngController.create);

// INCIDENTS

// Rota para listar INCIDENTS
routes.get('/incidents', IncidentController.index);

// Rota para inserir INCIDENTS
routes.post('/incidents', IncidentController.create);

// Rota para excluir INCIDENTS
routes.delete('/incidents/:id', IncidentController.delete);

// PROFILE
routes.get('/profile', ProfileController.index);

module.exports = routes;