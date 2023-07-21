const router = require('express').Router();

const User = require('./users-model');

//Tüm Kullanıcıları Getir
router.get('/', async (req,res,next) => {
    try {
        const users= await User.getAll();
        res.json(users);    
    } catch (error) {
        next(error);
       res.status(500).json({message: 'Kullanicilari getirirken oluşan hata.'})
    }
    
})

// İD'ye göre getir
router.get('/:id', async (req,res,next) => {
 const userId = req.params.id;
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

// KULLANICI SİLER
router.delete('/:id',async (req,res) => {
    
    try {
    const {id} = req.params;
    const deleted = await User.remove(id) ; 
    if (deleted) {
    res.json( { message: `User id ${id}, basari ile silindi.`})        
    } else {
    res.status(400).json ({message: `deleting error for id ${id}...` }) 
    }
    } catch (error) {
    res.status(500).json({message: 'Kullanici silerken Hata oluştu(DELETE_ERROR)'})
    }
    
    
})
// router.put('/:id',async (req,res,next) => {
//     const {id} = req.params;
//     try {
       
//         const updated = await User.update(id) ; 
//         if (updated) {
//             res.json( { message: `User id ${id}, guncellendi.`})        
//             } else {
//             res.status(400).json ({message: `update error for id ${id}...` }) 
//             }
//             } catch (error) {
//             res.status(500).json({message: 'Kullanici guncellenirken hata oluştu(UPDATE_ERROR)'})
//             }
// })


// USER KAYDI YAPAR
router.post("/createuser", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
    //Create User çalışıyor
  });
module.exports = router ;