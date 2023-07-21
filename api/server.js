//İMPORTLAR
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet'); 
const cors = require('cors');
const morgan = require('morgan');
// const {restricted} = require('./Auth/auth-middleware');
const userRouter = require('./Users/users-router');
const authRouter = require('./Auth/auth-router');
const tweetRouter =require('./Tweet/tweet-router')
const mentionRouter = require('./Mention/mention-router')

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
server.use('/api/auth',authRouter);
server.use('/api/tweets',tweetRouter);
server.use('/api/mentions',mentionRouter);
//ERROR MİDDLEWARE

server.use((err,req,res,next) => {
    res.status(err.status || 500)
    .json({message: err.message || 'Server error!...'})
})

//EXPORTS
module.exports = server ;