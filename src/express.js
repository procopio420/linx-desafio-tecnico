const express = require('express');
const bodyParser = require('body-parser');
const setRouter = require('./routes');
const startServer = require('./server');

const app = express();

const setupExpress = () => {
  app.use(
    bodyParser.raw({
      extended: false,
      limit: '10gb',
      type: 'application/octet-stream',
      inflate: true,
    }),
  );
  setRouter(app);
  startServer(app);
};

module.exports = { setupExpress, app };
