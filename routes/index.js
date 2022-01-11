const beersRouter = require('./beers');

const setUpRoutes = (app) => {
  app.use('/beers', beersRouter)
};

module.exports = {
  setUpRoutes
}