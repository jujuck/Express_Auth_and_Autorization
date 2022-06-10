const authRouter = require('express').Router();
require('dotenv').config();

const jwt = require('jsonwebtoken')
const Users = require('../models/users');
const { hashPassword, verifyPassword } = require('../helpers/auth');
const { checkedForEmail } = require('../middleware/auth')

authRouter.post('/signin', (req, res) => {
  hashPassword(req.body.password)
    .then(hashedpassword => {
      Users.createOne(req.body.email, hashedpassword)
        .then(result => {
          res.status(201).json({ user: req.body.email, msg: 'User created successfully' })
        })
        .catch(err => res.status(403).json({ msg: 'Error creating the user', err }))
    })
});

authRouter.post('/login', checkedForEmail, (req, res) => {
  verifyPassword(req.body.password, req.user.hashedpassword)
    .then(response => {
      const token = jwt.sign({ email: req.body.email }, process.env.PRIVATETOKEN)
      res
        .status(201)
        .cookie('user_token', token, { httpOnly: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) })
        .json({ email: req.body.email, token })
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
})

module.exports = authRouter;