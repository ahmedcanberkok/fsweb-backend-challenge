const router = require('express').Router();
const User = require('../Users/users-model');
const bcrypt = require('bcryptjs');
const {HASH_ROUND} = require('../../config');
const {generateToken} = require('./auth-middleware');


router.post('/register', async (req,res,next) => {
    try {
        const payload = req.body;
        payload.password = bcrypt.hashSync(payload.password,Number(HASH_ROUND))
        console.log(payload.password)
        const newUser = await User.create(payload);
        if (newUser) {
            res.status(201).json({message: `Welcome ${payload.username}...`})
        } else {
            next({status:400, message : "Create User ERROR..."})
        }
    } catch (error) {
        next(error);
    }
   //register endpointi çalışıyor
});

router.post('/login', async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const registerUser = await User.getByEmail(email);
        console.log(registerUser);
        if (registerUser && bcrypt.compareSync(password,registerUser.password)) {
            const token =generateToken(registerUser);
            res.status(200).json({message: `Welcome ${payload.username}...`,token})
        } else {
            next({status:401, message : "invalid credentials..."})
        }
    } catch (error) {
        next(error);
    }
    
});

// router.get('/logout', (req,res,next) => {

// });

module.exports= router ;