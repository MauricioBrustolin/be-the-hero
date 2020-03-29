const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(12).max(13),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create);

// INCIDENTS

// Rota para listar INCIDENTS
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentController.index);

// Rota para inserir INCIDENTS
routes.post('/incidents', IncidentController.create);

// Rota para excluir INCIDENTS
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete);

// PROFILE
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index);

module.exports = routes;