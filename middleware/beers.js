const Joi = require('joi');


const validatePostBeers = (req, res, next) => {
  validateBeers(req, res, next, 'required')
}

const validatePutBeers = (req, res, next) => {
  validateBeers(req, res, next, 'optional')
}

const validateBeers = (req, res, next, status) => {
  const { error } = Joi.object({
    brewers_tips: Joi.string().max(200).presence('optional'),
    contributed_by: Joi.string().max(24).presence('optional'),
    first_brewed: Joi.string().max(7).presence('optional'),
    description: Joi.string().max(600).presence(status),
    image_url: Joi.string().max(37).presence(status),
    name: Joi.string().max(35).presence(status),
    ph: Joi.string().max(3).presence(status),
    tagline: Joi.string().max(68).presence('optional')
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next()
  } else {
    res.status(400).json(error)
  }
}

module.exports = { validatePostBeers, validatePutBeers };
