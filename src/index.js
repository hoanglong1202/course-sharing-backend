const express = require('express');
const config = require('./config');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.listen(config.port, () => {
  console.log('App listening on port: ' + config.port )
});