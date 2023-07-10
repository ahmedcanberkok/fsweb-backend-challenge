//İMPORTLAR
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet'); 
const cors = require('cors');
const morgan = require('morgan');

//GLOBAL MİDDLEWARE
server.use(helmet());
server.use(cors());
server.use(morgan('dev')); // LOG atar

// ROUTERS
server.get ('/', (req,res) => {
    res.json({message: "Server up and running..."})
})


//ERROR MİDDLEWARE



//EXPORTS
module.exports = server ;