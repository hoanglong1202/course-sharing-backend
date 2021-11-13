const express = require('express');
const eventRoutes = require('./eventRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/events',
    route: eventRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
