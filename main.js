/**
 * Created by Stuart on 11/8/14.
 */

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/client'));

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('nlpthreading on port ' + port);
