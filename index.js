var config = require('config');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

const uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.uri}`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to MonogoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err.message));

app.use(express.json());
app.use('/api/genres', genres);


const port = process.env.PORT || config.PORT;
app.listen(port, () => console.log(`Listen on port ${port}`));
