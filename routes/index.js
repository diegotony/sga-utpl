const express = require('express');
const app = express();

// Collections of routes

app.use(require('./usuario'));
app.use(require('./sala'));
app.use(require('./rol'));
app.use(require('./permiso_acceso'));
app.use(require('./permiso_rol'));
app.use(require('./login'));
module.exports = app;