const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');

const startServer = require('./server');
const ProductsController = require('./controller/products');

const workers = [];
const controller = new ProductsController();

const app = express();

const setupServer = (isInTest) => {
  if (!isInTest && cluster.isMaster) {
    const cores = require('os').cpus();
    console.log(`Master cluster setting up ${cores.length} workers`);

    cores.forEach((_, index) => {
      workers.push(cluster.fork());
      workers[index].on('message', (message) => console.log(message));
    });

    cluster.on('online', (worker) =>
      console.log(`Worker ${worker.process.pid} is listening`),
    );

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died :(`);
      console.log('Starting a new worker...');
      workers.push(cluster.fork());
      workers[workers.length - 1].on('message', (message) =>
        console.log(message),
      );
    });
  } else {
    app.use(
      bodyParser.raw({
        extended: false,
        limit: '10gb',
        type: 'application/octet-stream',
        inflate: true,
      }),
    );
    app.post(
      '/products',
      controller.getData,
      controller.checkCache,
      controller.postProduct,
    );
    if (!isInTest) {
      startServer(app);
    }
  }
};

setupServer(process.env.NODE_ENV === 'test');

module.exports = app;
