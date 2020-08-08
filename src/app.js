const { setupWorkerProcesses, cluster } = require('./cluster');
const { setupExpress } = require('./express');

const setupServer = (isClusterRequired) => {
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    setupExpress();
  }
};

setupServer(true);
