/**
 * OPResource express node server.
 * Run with `node index.js`
 */

'use strict';

const path = require('path');
const express = require('express');
const app = express();
const port = 80;

// Log on any file access
app.use(function(req, res, next){
    console.log(req.originalUrl);
    next();
})
app.use('/lang0000', express.static('lang0000'));

// The index
app.get('/', function(req, res, next) {
    console.log("Client hit index!");
    console.log(req.params);
    console.log(req.query);
    res.sendFile(path.join(__dirname + '/resource_0.dat'));
});

app.listen(port, () => console.log(`Local development OPResource server initialized`));