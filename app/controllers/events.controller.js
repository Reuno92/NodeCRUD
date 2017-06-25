const Event = require('../models/event');

module.exports = {
    showEvents : showEvents,
    showSingleEvent : showSingleEvent,
    seedEvents : seedEvents,
    showCreate : showCreate,
    processCreate : processCreate
};

/**
 *  Montrer tous les évènements
 */
function showEvents(req, res) {
    //creation mini-event.
    Event.find({}, function(err, events) {
        if (err) {
            res.status(404);
            res.send('Events not found!');
        }

        //retourne une vue avec des données.
        res.render('pages/events', { events : events });
    });
}

/**
 * Affiche un évenement
 */
function showSingleEvent (req, res) {
      //Faire un évènement
      Event.findOne({ slug : req.params.slug}, function(err, event){
          if (err) {
              res.status(404);
              res.send('Events not found!');
          }

          res.render('pages/single', {
              event   : event,
              success : req.flash('success')
          });
      });
}

/**
 * Remplir la base de données
 */
function seedEvents(req, res) {
    // Créer quelques évènements
    const events = [
        { name : 'Basketball', description : 'Lancer dans le panier' },
        { name : 'Piscine', description : 'Nager plus vite qu\'un poisson' },
        { name : 'Musculation', description : 'Lever des choses lourdes' },
        { name : 'Ping Pong', description : 'Echange de balle très rapide'}
    ];

    // Utilisé le model d'évènement pour insérer/sauvegarder
    Event.remove({}, function(){
        for (event in events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });

    // Remplir
    res.send('Base de donnée rempli');
}

/**
 *   Afficher la creation formulaire
 */
function showCreate(req, res) {
    res.render('pages/create', {
        errors : req.flash('errors')
    });
}

/**
 *   Traiter le formulaire de création
 */
function processCreate(req, res) {
    // information valide
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    // Si il y a des erreurs, redirection et sauvegarde des erreurs de flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(function(err){
          err.msg;
        }));
        return res.redirect('/events/create');
    }

    // Créatiion d'un nouvel évènement
    const event = new Event({
        name : req.body.name,
        description: req.body.description
    });

    // Sauvegarder l'évènement
    event.save(function(err){
        if (err) {
            throw err;
        }

        // Mutateur un message flash de succès
        req.flash('success', 'Evènement crée avec succès !');

        // Redirection vers l'évènement nouvellement crée
        res.redirect(`/events/${event.slug}`);
    });
}