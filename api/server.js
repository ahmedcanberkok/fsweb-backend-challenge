//İMPORTLAR
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet'); 
const cors = require('cors');
const morgan = require('morgan');
const {resricted} = require('./Auth/auth-middleware');
const userRouter = require('./Users/users-router');
//GLOBAL MİDDLEWARE
//3rd-party middleware

server.use(helmet());  
server.use(cors());
server.use(morgan('dev')); // LOG atar
server.use(express.json());

// ROUTERS
server.get ('/', (req,res) => {
    res.json({message: "Server up and running..."})
})
server.use('/api/users',userRouter);

//ERROR MİDDLEWARE

server.use((err,req,res,next) => {
    res.status(err.status || 500)
    .json({message: err.message || 'Server error!...'})
})

//EXPORTS
module.exports = server ;