/**
 * Created by Boaz on 25/01/2017.
 */

var express = require('express');
var app = express();
var path = require('path');
var open = require('open');
var cache = [];

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/form', function(req, res) {


    var validForm = validateParameters(req.query);
    if  (validForm){
        cache.push(req.query);
        res.status(200).send(path.join('ok'));
    } else {
        res.status(500).send(path.join('error...'));
    }

    for (var key in req.query) {
        console.log(key + " = " + req.query[key] );
    }


});

function validateParameters(reqQuery) {

    for (var key in reqQuery) {
        if(reqQuery[key] === "" ){
            return false;
        }
        return true;
    }
}


app.listen(8080);

open("127.0.0.1:8080", 'chrome');
