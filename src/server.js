const startServer = (app) => {
  app.listen(8000, () =>
    console.log(`Started server on port 8000 for Process Id ${process.pid}`),
  );
};

module.exports = startServer;