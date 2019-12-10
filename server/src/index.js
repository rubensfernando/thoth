const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRoute = require('./routes/notes');


const app = express();


const connectWithRetry = function () {
  return mongoose.connect(
    `mongodb://mongo:27017/thoth`,
    {
      useNewUrlParser: true,
    }, function (err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
  });
};
connectWithRetry();

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/notes', notesRoute);

app.get('/status', (req, res) => {
  res.send('Up and running!');
});

app.listen(3003, () => console.log('Listening port 3003'));
