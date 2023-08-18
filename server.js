// basic lib import
const {readdirSync} = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const router = require('./src/routes/api');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();

// security middleware lib import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// database lib import
const mongoose = require('mongoose');

// security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.urlencoded({ extended: false }));

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter);

// routing implement
// readdirSync("./routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`)));

// Routing Implement
app.use("/api/v1",router)
// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});

// server
const port = process.env.PORT || 10000;

// Connect to DB and start server
mongoose.set('strictQuery', false)
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, ()=>{
            console.log(`Database connected\nServer running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));