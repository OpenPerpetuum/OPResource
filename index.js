/**
 * OPResource express node server.
 * Run with `node index.js`
 */

'use strict';

const path = require('path');
const express = require('express');
const fs = require('fs');
const stream = require('stream');
const gzip = require('zlib');

const app = express();
const port = process.env.PORT || 1337;
const layerspath = process.env.GAMMA_LAYERS_NEW || 'lang0000/layers/GAMMA_LAYERS_NEW';

// Log on any file access
app.use(function(req, res, next) {
    console.log(req.originalUrl);
    next();
});

// By default, we give resources along the request path
app.use('/lang0000', express.static('lang0000', { fallthrough: true }));

// Replace the not found images with the default.
app.use('/**/*.png', express.static('lang0000/icons/default/00000000.png'));

// Сompress the file, add its size to the beginning and send it as an answer.
function DeflateAndSeend(file, responce) {
    // Four bytes with the size of the source file.
    let buf = Buffer.alloc(4);
    buf.writeInt32LE(fs.statSync(file).size);
    responce.write(buf);

    // Pipeline for delivering compressed content to the client.
    console.log('Deflate and send file:', file);
    stream.pipeline(fs.createReadStream(file), gzip.createDeflate(), responce, (err) => {
        if (err) {
            console.log('Pipeline error:', err, 'in', file);
            return responce.status(400).send();
        }
    });
}

// Prepare and deliver layer files from raw files intended for the server.
function ProcessReq(layer, request, responce)
{
    // Looking for the zone number in the request.
    const url = request.url.match(/\/\d{4}\//);
    if (url == null) {
        console.log('No zone number');
        return responce.status(400).send();
    }
    const zone = url[0].match(/\d{4}/)[0];

    // Сheck that the request matches the template.
    const expect = new RegExp('\\/lang0000\\/layers\\/' + zone + '\\/' + layer + zone + '\\/\\d{8}\\.dat');
    if (expect.exec(request.url) == null) {
        console.log('URL format incorrect');
        return responce.status(400).send();
    }

    // Collecting the path to the file with raw data.
    const bin = path.join(__dirname, layerspath, layer + '.' + zone + '.bin');
    console.log('Client hit', layer, bin);

    // This should compress and transfer the file on the fly.
    DeflateAndSeend(bin, responce);
}

// Thes altitude layer request.
app.get('/lang0000/layers/*/altitude*/*.dat', function (req, res) {
    ProcessReq('altitude', req, res);
});

// The blocks layer request.
app.get('/lang0000/layers/*/blocks*/*.dat', function (req, res) {
    ProcessReq('blocks', req, res);
});

// The altitude layer request.
app.get('/lang0000/layers/*/control*/*.dat', function (req, res) {
    ProcessReq('control', req, res);
});

// The plants layer request.
app.get('/lang0000/layers/*/plants*/*.dat', function (req, res) {
    ProcessReq('plants', req, res);
});

// The index
app.get('/', function(req, res, next) {
    console.log('Client hit index!');
    res.sendFile(path.join(__dirname, 'resource_0.dat'));
});

app.listen(port, () => console.log('Local development OPResource server initialized'));
