const Event = require('../models/event');

module.exports = {
    showEvents      : showEvents,
    showSingleEvent : showSingleEvent,
    seedEvents      : seedEvents,
    showCreate      : showCreate,
    processCreate   : processCreate,
    showEdit        : showEdit,
    processEdit     : processEdit
};

/**
 *  Montrer tous les évènements
 */
function showEvents(req, res) {
    // Creation mini-event.
    Event.find({}, function(err, events) {
        if (err) {
            res.status(404);
            res.send('Events not found!');
        }

        // Retourne une vue avec des données.
        res.render('pages/events', {
            events : events,
            success : req.flash('success')
        });
    });
}

/**
 * Affiche un évenement
 */
function showSingleEvent (req, res) {
      // Faire un évènement
      Event.findOne({ slug : req.params.slug}, function(err, event){
          if (err) {
              res.status(404);
              res.send('Events not found!');
          }

          //rendu de la page single avec les paramètres event et erreur
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
    // Rendu de la page Create avec le paramètre erreur
    res.render('pages/create', {
        errors : req.flash('errors')
    });
}

/**
 *   Traiter le formulaire de création
 */
function processCreate(req, res) {
    // information valide
    req.checkBody('name', 'Nom de l\'évènement est requis.').notEmpty();
    req.checkBody('description', 'Description de l\'évènement est requis.').notEmpty();

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

/**
 * Afficher le formulaire d'édition
 */
function showEdit(req, res) {
    Event.findOne({slug: req.params.slug}, function(err, event){
        res.render('pages/edit', {
            event : event,
            errors : req.flash('errors')
        });
    });
}

/**
 *  Traitement du formulaire d'édition
 */
function processEdit(req, res) {
    // information valide
    req.checkBody('name', 'Nom de l\'évènement est requis.').notEmpty();
    req.checkBody('description', 'Description de l\'évènement est requis.').notEmpty();

    // Si il y a des erreurs, redirection et sauvegarde des erreurs de flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(function(err){
            err.msg;
        }));
        return res.redirect(`/events/${req.params.slug}/edit`);
    }

    // Trouver l'évènement en cours
    Event.findOne({ slug : req.params.slug }, function(err, event) {

        // Mise à jour de l'évènement
        event.name = req.body.name;
        event.description = req.body.description;

        event.save(function(err) {
            if (err) {
                throw err
            }

            // Message de succès avec flash
            req.flash('success', 'Modification de l\'évènement avec succès');

            // Redirection vers la page events
            res.redirect('/events');
        });
    });
}

