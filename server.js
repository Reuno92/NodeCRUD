//boucle de variable d'environnement
require('dotenv').config();

// Prise en main des dépendance
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');

// Configuration des dépendances ====================
// appel d'express où sont situer les assets statique
app.use(express.static(__dirname + 'public'));

//modification ejs pour le moteur de templating
app.set('view engine', 'ejs');
app.use(expressLayouts);

//connection à unr base de données
mongoose.connect(process.env.DB_URI);

// Modification des routes =========================
app.use(require('./app/routes'));

// Démarrage du serveur ============================
app.listen(port, function() {
    console.log(`Ecoute du serveur sur http://localhost:${port}`);
});

