const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRoute = require('./routes/notes');


const app = express();

mongoose.connect(
  `mongodb://mongo:27017/thoth`,
  {
    useNewUrlParser: true,
  },
);
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
