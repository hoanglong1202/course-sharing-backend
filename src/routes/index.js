const express = require('express');
const authRoutes = require('./auth.routes');
const courseRoutes = require('./course.routes');
const creatorRoutes = require('./creator.routes');
const adminRoutes = require('./admin.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/course',
    route: courseRoutes,
  },
  {
    path: '/creator',
    route: creatorRoutes,
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
