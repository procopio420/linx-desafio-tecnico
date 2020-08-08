const express = require('express');
const ProductsController = require('./controller/products');

const router = express.Router();
const controller = new ProductsController();

const setRouter = (app) => {
  router.post(
    '/products',
    controller.getData,
    controller.checkCache,
    controller.postProduct,
  );
  app.use(router);
};

module.exports = setRouter;
