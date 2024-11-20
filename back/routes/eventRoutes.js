const express = require('express');
const eventRoutes = express.Router();
const eventController = require('../controllers/eventController');

eventRoutes.post('/', eventController.createEvent);
eventRoutes.get('/', eventController.getEvents);
eventRoutes.get('/:id', eventController.getEventById);
eventRoutes.put('/:id', eventController.updateEvent);
eventRoutes.delete('/:id', eventController.deleteEvent);

module.exports = eventRoutes;