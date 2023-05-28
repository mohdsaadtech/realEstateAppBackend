import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import listingRoutes from './routes/listings.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(express.static('public'));

const CONNECTION_URL = 'mongodb://0.0.0.0:27017/realestatedb';
const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log("hi", error.message));

app.use('/', listingRoutes);
app.use('/', userRoutes);



