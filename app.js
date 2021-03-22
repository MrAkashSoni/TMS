const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./component/auth/auth.route');
const vehicleRouter = require('./component/vehicle/vehicle.route');
const transporterRouter = require('./component/transporter/transporter.route');

const app = express();

const { handleError, ErrorHandler } = require('./helper/error');

require('dotenv').config();

const url = process.env.MONGO_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected.');
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(`${__dirname}/`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.get('/error', () => {
    throw new ErrorHandler(500, 'Internal server error');
});

app.use('/api/auth', authRouter);
app.use('/api/vehicle', vehicleRouter);
app.use('/api/transporter', transporterRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server connected to ${process.env.PORT} port.`);
});

module.exports = app;