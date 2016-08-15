// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up a mongoose model and pass it using module.exports
var stampSchema = new Schema({
    // User that owns the stamp.
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    // Title or short name of stamp.
    name: String,
    // Description of stamp.
    description: String,
    // Url of image.
    image: [String],
    // How long this stamp was held.
    aquired: {
        // Date stamp was first aquired.
        from: Date,
        // Date stamp was released.
        to: Date,
        // Details of stamp acquisition and release.
        description: String
    },
    // Catalogues
    catalogue: {
        // Stampist catalogue reference.
        stampist: { type: Schema.Types.ObjectId, ref: 'CatalogueStampist' },
        // Scott catalogue reference.
        scott: { type: Schema.Types.ObjectId, ref: 'CatalogueScott' }
    },
    // Meta information.
    meta: {
        created: Date,
        updated: Date,
    }
});

module.exports = mongoose.model('Stamp', stampSchema);
