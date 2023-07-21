const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')
const User = require('../Users/users-model');

const resricted = async (req,res,next) => {
    try {
        const token =req.header.authorization;
        if(token){
            const tokenValue = await client.get(token);
            if(tokenValue) {
                jwt.verify(token, JWT_SECRET, (err,decodedJWT)=>{
                    if(!err){
                        req.decodedJWT = decodedJWT;
                        next();
                    } else {
                        next(err);
                    }
                })
            } else {
                next({status:403, message: "Token is expired!.."})
            }
            
        } else {
            next({status:400, message: "Token required!.."})
        }
    } catch(err) {
        next(err)
    }
}

const generateToken = (req,res,next) => {
    const payload = {
        id: user_id,
        username: username,
    }
    const options = {
        expiresIn:"3h"
    }
    const token = jwt.sign(payload,JWT_SECRET,options)
   };
   

module.exports = {
    resricted,
    generateToken,
}