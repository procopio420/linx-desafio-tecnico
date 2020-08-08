const cluster = require('cluster');

const workers = [];

const setupWorkerProcesses = () => {
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
};

module.exports = { setupWorkerProcesses, cluster };
