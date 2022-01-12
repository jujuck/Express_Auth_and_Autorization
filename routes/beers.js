const beersRouter = require('express').Router();
const { findMany, findOne } = require('../models/beers')

beersRouter.get('/', (req, res) => {
  const { text, minph } = req.query
  findMany({ filter: { text, minph } })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})


beersRouter.get('/:id', (req, res) => {
  findOne(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

module.exports = beersRouter;