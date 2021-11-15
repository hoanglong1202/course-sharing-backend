const express = require('express');
const eventRoutes = require('./eventRoutes');
const authRoutes = require('./auth.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/events',
    route: eventRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
