// Création d'un nouveau router express
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller');
    eventController = require('./controllers/events.controller');

// router exportation
module.exports = router;

// Définir les routes
router.get('/',       mainController.showHome);
router.get('/events', eventController.showEvents);

// Remplir les évènements
router.get('/events/seed', eventController.seedEvents);

// Créer un événement
router.get('/events/create',  eventController.showCreate);
router.post('/events/create', eventController.processCreate);

// Editer un évènement
router.get('/events/:slug/edit', eventController.showEdit);
router.post('/events/:slug', eventController.processEdit);

//Supprimer un évènement
router.get('/events/:slug/delete', eventController.deleteEvent);

// Afficher un évènement unique
router.get('/events/', eventController.showSingleEvent);
