const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
// for runtime environment variables
const dotenv = require('dotenv').config();

const headlinesRouter = require('./routes/headlines');
const sourcesRouter = require('./routes/sources');

// create express instance
let app = express();

// morgan for simple logging
app.use(morgan('tiny'));

// body parser to parse request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve the static client side files
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/headlines', headlinesRouter);
app.use('/api/sources', sourcesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));