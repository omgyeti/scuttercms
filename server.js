const config = require('./config.json');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}?retryWrites=true&w=majority&authMechanism=DEFAULT&authSource=${config.mongodb.authSource}`, { useNewUrlParser: true, serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Dynamically load routes from the 'routes' folder
fs.readdirSync('./routes').forEach((file) => {
  const route = require(`./routes/${file}`);
  app.use(route);
});

// 404 handling middleware
app.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    errorCode: 404,
    errorMessage: 'The page you are looking for could not be found.'
  });
});

// Error handling middleware
function handleErrors(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { title: 'Error', errorCode: err.status || 500, errorMessage: err.message || 'Internal Server Error' });
}

app.use(handleErrors);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(config.port, () => console.log('Blog server opened on port ' + config.port + '!'));
