// Boucle de variable d'environnement
require('dotenv').config();

// Prise en main des dépendance
const express = require('express'),
    app            = express(),
    port           = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    session        = require('express-session'),
    cookieParser   = require('cookie-parser'),
    flash          = require('connect-flash');

// Configuration des dépendances ============================
// Mutateur session et cookie parser
app.use(cookieParser());
app.use(session({
    secret : process.env.SECRET,
    cookie : { maxAge : 60000 },
    resave : false, // Obliger la session à être sauvegardée
    saveUnitialized : false // Ne pas enregistrer non modifié
}));
app.use(flash());

// Appel d'express où sont situer les assets statique
app.use(express.static(__dirname + 'public'));

// Modification ejs pour le moteur de templating
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Connection à une base de données
mongoose.connect(process.env.DB_URI);

// Utilisation du module body parser attraper les info du formulaire
app.use(bodyParser.urlencoded({ extended: true}));

// Modification des routes ======================================
app.use(require('./app/routes'));

// Démarrage du serveur =========================================
app.listen(port, function() {
    console.log(`Ecoute du serveur sur http://localhost:${port}`);
});

