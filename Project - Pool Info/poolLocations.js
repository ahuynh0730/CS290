//Author: Anthony Huynh



var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8080);

'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = "H9tROR0DL81A9eUYWNrUBRB9wEm3N9dainQF_YpP21YPDvy9V3hKvHYw3-lwLUrwMIrqdbQ79Y3MI9d3VgwQYEPnvObHo2G2sVLC5q2heRgbf7kjOWOjgqhRXMp8XHYx";


const client = yelp.client(apiKey);



app.get("/", function(req, res){
	res.render('poolLocations');
});



app.post("/", function(req, res) {
	var searchRequest = {
		term: "billiards", 
		location: req.body.zipCode
	};
	var resultParameters = [];
	client.search(searchRequest).then(response => {
		for (var i = 0; i<20; i++){
			const result = response.jsonBody.businesses[i];
			resultParameters.push(result);
		}
		var context = {};
		context.list=resultParameters;
		res.render("locationsList", context);
	}).catch(e => {
		console.log(e);
	});
});


app.use(function(req, res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
