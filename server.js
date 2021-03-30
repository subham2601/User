require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJWT = require('express-jwt');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const app = express();
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // swagger

app.use('/agent',  require('./src/routes/agent'));
app.use('/admin',  require('./src/routes/admin'))

if (process.env.JWT_DISABLED !== 'true') {
  // TODO: Find a better to manage secret key
  // TODO: Find a better way to manage the excluded path
  app.use(expressJWT({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/login\//, /\/register/] }));
}
// Connecting to the database
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const server = app.listen(process.env.PORT || 8082, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('app is listening at http://%s:%s', host, port);
});
