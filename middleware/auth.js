const Users = require('../models/users');

const checkedForEmail = (req, res, next) => {
  Users.findOne(req.body.email)
    .then(result => {
      if (result[0]) {
        req.user = result[0];
        next()
      } else {
        res.status(401).send('wrong credentials, try again')
      }
    })
}

module.exports = { checkedForEmail }