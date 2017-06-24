const Event = require('../models/event');

module.exports = {

    //montrer tous les évènements
    showEvents : function(req, res) {

        //creation mini-event.
        const events = [
            { name : 'Basketball', slug : 'basketball', description : 'Lancer dans le panier' },
            { name : 'Piscine', slug : 'piscine', description : 'Nager plus vite qu\'un poisson' },
            { name : 'Musculation', slug : 'musculation', description : 'Lever des choses lourdes' }
        ];


        //retourne une vue avec des données.
        res.render('pages/events', { events : events });
    },

    //Affiche un évenement
    showSingleEvent : function(req, res) {
      //Faire un évènement
        const event = { name : 'Basketball', slug : 'basketball', description : 'Lancer dans le panier' };

        res.render('pages/single', { event : event} );
    },

    //remplir la base de données
    seedEvents: function(req, res) {
        // Créer quelques évènements
        const events = [
            { name : 'Basketball', description : 'Lancer dans le panier' },
            { name : 'Piscine', description : 'Nager plus vite qu\'un poisson' },
            { name : 'Musculation', description : 'Lever des choses lourdes' },
            { name : 'Ping Pong', description : 'Echange de balle très rapide'}
        ];

        // utilisé le model d'évènement pour insérer/sauvegarder
        Event.remove({}, function(){
            for (event in events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });

        // Remplir
        res.send('Base de donnée rempli');
    }
};

