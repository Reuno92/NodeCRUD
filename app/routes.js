// Création d'un nouveau router express
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller');
    eventController = require('./controllers/events.controller');

// router exportation
module.exports = router;

// Définir les routes
router.get('/', mainController.showHome);
router.get('/events', eventController.showEvents);

// Remplir les évènements
router.get('/events/seed', eventController.seedEvents);

//

// Afficher un évènement unique
router.get('/events/:slug', eventController.showSingleEvent);
