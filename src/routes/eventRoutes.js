const express = require('express');
const eventControll = require('../controllers/eventController');
const router = express.Router();

router.get('/', eventControll.getAllEvents);
router.get('/:id', eventControll.getEvent);
router.post('/event', eventControll.addEvent);
router.put('/event/:id', eventControll.updatEvent);
router.delete('/event/:id', eventControll.deleteEvent);

module.exports = router;
