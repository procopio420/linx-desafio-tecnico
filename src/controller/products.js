const redis = require('redis');
const fileSystem = require('fs');
const streamToString = require('../utils/streamToString');

const redisClient = redis.createClient(6379);

class ProductsController {
  postProduct(_, response) {
    return response
      .status(response.locals.status)
      .json({ message: response.locals.status === 200 ? 'OK' : 'Forbidden' });
  }

  getData(request, _, next) {
    try {
      const writeStream = fileSystem.createWriteStream('./data');
      request.pipe(writeStream);
      next();
    } catch (e) {
      console.error(e);
    }
  }

  checkCache(_, response, next) {
    try {
      redisClient.get('lastRequest', async (error, data) => {
        const readStream = fileSystem.createReadStream('./data');
        const result = await streamToString(readStream);

        if (result === data) {
          response.locals.status = 403;
        } else {
          response.locals.status = 200;
          redisClient.setex('lastRequest', 600, result);
        }
        next();
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = ProductsController;
