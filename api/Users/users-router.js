const router = require('express').Router();

router.get('/',(req,res,next) => {
    res.json('router working as expected');
})

module.exports = router ;