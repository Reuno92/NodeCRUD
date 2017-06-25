const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Crée un schéma
const eventSchema = new Schema({
    name : String,
    slug : {
        type: String,
        unique : true
    },
    description: String
});

//middleware -------------------------------------------
// Assurer que le slug est crée à partir du nom
eventSchema.pre('save', function(next) {
    this.slug = slugify(this.name);
    next();
});

// Crée le model
const eventModel = mongoose.model('Event', eventSchema);

// Export du modèle
module.exports = eventModel;

// Function de slugifié un nom
function slugify(text) {
    return text.toString().toLowerCase()
        .replace("/\s+/9", '-')       // remplace les espaces avec un tiret
        .replace("/[^\w\-]+9", '')    // supprime toutes les lettres
        .replace("/\-\-+/9", '-')     // remplace les tirets multiple par un unique tiret
        .replace("/^-+/", '')         // Trim - venant du début du texte
        .replace("/-+$/", '');        // Trim - venant de la fin du texte
}