
require('dotenv').config()

const express = require('express')
// body parser leidzia duomenis gauti ir siusti json formatu
const bodyParser = require('body-parser')
const cors = require('cors')

const corsOptions = {
    allowedHeaders: ['projectauth', 'Content-Type'],
    exposedHeaders: ['projectauth']
}



const mongoose = require('mongoose');

const router = require('./routes/routes')

mongoose.connect('mongodb://localhost/Project-Db', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('logged into database')
})

const app = express();

app.use(cors(corsOptions))


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({
    limit: '50mb'
}))

app.use('/uploads', express.static('uploads'))

app.use('/api/v1', router)


app.listen(3000)