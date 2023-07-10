//İMPORTLAR
const express = require('express');
const server = express();
require('dotenv').config();

//GLOBAL MİDDLEWARE



// ROUTERS
server.get ('/', (req,res) => {
    res.json({message: "Server up and running..."})
})


//ERROR MİDDLEWARE



//EXPORTS
module.exports = server ;