// Import packages.
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config     = require('./config'); // get our config file
var User       = require('./server/models/user'); // get our mongoose model
    
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
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

var router = express.Router(); 
require('./server/routes/public/api')(app, router);
require('./server/routes/private/secureRoutes')(app, router);
require('./server/routes/private/api')(app, router);
app.use(router);

// Start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

