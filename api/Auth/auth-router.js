const router = require('express').Router();
const User = require('../Users/users-model');
const bcrypt = require('bcryptjs');
const {HASH_ROUND} = require('../../config');

router.post('/register', async (req,res,next) => {
    try {
        const payload = req.body;
        payload.password = bcrypt.hashSync(payload.password,HASH_ROUND)
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
        const registeredUSer = await User.getByEmail(email);
        if (registeredUSer && registeredUSer.password === password) {
            res.status(200).json({message: `Welcome ${payload.username}...`})
        } else {
            next({status:401, message : "invalid credentials..."})
        }
    } catch (error) {
        next(error);
    }
    
});
router.post('/password/reset', (req,res,next) => {

});
// router.get('/logout', (req,res,next) => {

// });

module.exports= router ;