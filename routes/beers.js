const beersRouter = require('express').Router();
const { findMany, findOne, createOne, updateOne } = require('../models/beers');
const { checkAuth } = require('../middleware/auth');
const { validatePostBeers, validatePutBeers } = require('../middleware/beers');

beersRouter.get('/', (req, res) => {
  const { text, minph } = req.query
  findMany({ filter: { text, minph } })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})


beersRouter.get('/:id', checkAuth, (req, res) => {
  findOne(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

beersRouter.post('/', checkAuth, validatePostBeers, (req, res) => {
  createOne(req.body)
    .then(result => res.status(203).json({ msg: 'Beer correctly added', data: { ...req.body, id: result[0].insertId } }))
    .catch(err => res.status(500).json(err))
})

beersRouter.put('/:id', checkAuth, validatePutBeers, (req, res) => {
  updateOne(req.body, req.params.id)
    .then(result => res.status(203).json({ msg: 'Beer correctly updated', data: { ...req.body } }))
    .catch(err => res.status(500).json(err))
})

module.exports = beersRouter;