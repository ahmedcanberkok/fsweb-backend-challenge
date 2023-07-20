const router = require('express').Router();
const User = require('./users-model');
router.get('/', async (req,res,next) => {
    try {
        const users= await User.getAll();
        res.json(users);    
    } catch (error) {
       res.status(500).json({message: 'Kullanicilari getirirken oluşan hata.'})
    }
    
})
router.get('/:id', async (req,res,next) => {
 const userId = await req.params.id;
    try {
    const user = await User.getById(userId)
    if (user) {
        res.json(user)
    } else {
    res.status(404).json({message:'Kullanici bulunamadi'});        
    }
    } catch (error) {
    res.status(500).json({message: 'Kullaniciyi getirirken hata oluştu.'})
    }
})
router.delete('/:id',async (req,res,next) => {
    const {id} = req.params;
    try {
    const deleted = await User.remove(id) ; 
    if (deleted) {
    res.json( { message: `User id ${id}, silindi.`})        
    } else {
    res.status(400).json ({message: `deleting error for id ${id}...` }) 
    }
    } catch (error) {
    res.status(500).json({message: 'Kullanici silerken Hata oluştu(DELETE_ERROR)'})
    }
    
    
})
router.put('/:id',async (req,res,next) => {
    const {id} = req.params;
    try {
        const updated = await User.update(id) ; 
        if (deleted) {
            res.json( { message: `User id ${id}, guncellendi.`})        
            } else {
            res.status(400).json ({message: `update error for id ${id}...` }) 
            }
            } catch (error) {
            res.status(500).json({message: 'Kullanici guncellenirken hata oluştu(UPDATE_ERROR)'})
            }
})
module.exports = router ;