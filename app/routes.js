// Création d'un nouveau router express
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller');
    eventsController = require('./controllers/events.controller');

// router exportation
module.exports = router;

// Définir les routes
router.get('/',       mainController.showHome);     // Route principale
router.get('/events', eventsController.showEvents); // Route évènements

// Remplir les évènements
router.get('/events/seed', eventsController.seedEvents);

// Créer un événement
router.get('/events/create',  eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);

// Editer un évènement
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug', eventsController.processEdit);

//Supprimer un évènement
router.get('/events/:slug/delete', eventsController.deleteEvent);

// Afficher un évènement unique
router.get('/events/:slug', eventsController.showSingleEvent);
