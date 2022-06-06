const connection = require('../db-config');
const db = connection.promise();

const createOne = (email, hashpassword) => {
  return db.query('INSERT INTO users (email, hashedpassword) VALUES (?, ?)', [email, hashpassword])
    .then(res => res)
};

const findOne = (email) => {
  return db.query('SELECT * FROM users WHERE email = ?', [email])
    .then(res => res[0])
}

module.exports = { createOne, findOne }