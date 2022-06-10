const connection = require('../db-config');
const db = connection.promise();

const findMany = ({ filter: { text, minph } }) => {
  let sqlQuery = 'SELECT * FROM beers';
  const sqlValue = [];

  if (text && minph) {
    sqlQuery += ' WHERE name LIKE ? OR description LIKE ? AND ph > ?';
    sqlValue.push(`%${text}%`, `%${text}%`, minph);
  } else if (text) {
    sqlQuery += ' WHERE name LIKE ? OR description LIKE ?';
    sqlValue.push(`%${text}%`, `%${text}%`);
  } else if (minph) {
    sqlQuery += ' WHERE ph > ?';
    sqlValue.push(minph)
  }

  return db.query(sqlQuery, sqlValue).then(result => result[0])
}


const findOne = (id) => {
  return db.query('SELECT * FROM beers WHERE id = ?', [id]).then(result => result[0][0])
}

const createOne = (body) => {
  const { name, image_url, ph, tagline, brewers_tips, contributed_by, description, first_brewed } = body;
  return db.query('INSERT INTO beers(name, image_url, ph, tagline, brewers_tips, contributed_by, description, first_brewed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, image_url, ph, tagline, brewers_tips, contributed_by, description, first_brewed])
}

module.exports = {
  findMany,
  findOne,
  createOne
}