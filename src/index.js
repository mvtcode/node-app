'use strict';

/*
 document: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
*/

const express = require('express');
const os = require('os');
const ifaces = os.networkInterfaces();

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

const listIp = [];

Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    listIp.push(`${ifname}: ${iface.address}`);
  });
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello world<br/>IP Server:<br/> ${listIp.join(', ')}`);
});

app.get('/env', (req, res) => {
  res.json(process.env);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);