const authRouter = require('express').Router();
require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')
const Users = require('../models/users');

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (password, hashedPassword) => {
  return argon2.verify(hashedPassword, password);
}

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

authRouter.post('/login', (req, res) => {
  Users.findOne(req.body.email)
    .then(result => {
      if (result[0]) {
        verifyPassword(req.body.password, result[0].hashedpassword)
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
      } else {
        res.status(401).send('wrong credentials, try again')
      }
    })
    .catch(err => res.status(500))
})

module.exports = authRouter;