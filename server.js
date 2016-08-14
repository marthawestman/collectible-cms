// Import packages.
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config     = require('./config'); // get our config file

// Should we put these into app.set for a poor man's dependency injection?
var User              = require('./server/models/user');
var CatalogueStampist = require('./server/models/stamps/catalogueStampist');
var CatalogueScott    = require('./server/models/stamps/catalogueScott');
var Stamp             = require('./server/models/stamps/stamp');

// Configuration.
var port = config.port;
mongoose.connect(config.database);
app.set('tokenSignature', config.tokenSignature);

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/apidoc', express.static('apidoc'));

// Routes
var router = express.Router();
require('./server/routes/')(app, router);
app.use(router);

// Start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

