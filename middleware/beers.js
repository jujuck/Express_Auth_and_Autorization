const Joi = require('joi');

const validateBeers = (req, res, next) => {
  const { err } = Joi.object({
    brewers_tips: Joi.string().max(200).presence('optional'),
    contributed_by: Joi.string().max(24).presence('optional'),
    first_brewed: Joi.string().max(7).presence('optional'),
    description: Joi.string().max(600).presence('required'),
    image_url: Joi.string().max(37).presence('required'),
    name: Joi.string().max(35).presence('required'),
    ph: Joi.string().max(3).presence('required'),
    tagline: Joi.string().max(68).presence('optional')
  }).validate(req.body, { abortEarly: false });

  if (!err) {
    next()
  } else {
    res.status(400).json(err)
  }
}

module.exports = { validateBeers };