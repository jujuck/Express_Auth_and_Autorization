const authRouter = require('express').Router();
const argon2 = require('argon2');
const Users = require('../models/users')

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
            res.status(201).send('Yep')
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