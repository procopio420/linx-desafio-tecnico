require('dotenv').config();
const startServer = (app) => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Started server on port ${process.env.PORT} for Process Id ${process.pid}`,
    );
  });
};

module.exports = startServer;
