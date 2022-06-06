const beersRouter = require('./beers');
const authRouter = require('./auth');

const setUpRoutes = (app) => {
  app.use('/beers', beersRouter),
    app.use('/auth', authRouter)
};

module.exports = {
  setUpRoutes
}