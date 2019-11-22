//app.js
const express = require('express'), expressLogging = require('express-logging'), logger = require('logops');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

app.use(express.static("static"));
app.use(expressLogging(logger));

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://someuser:abcd1234@cluster0-t1u1y.mongodb.net/test?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});