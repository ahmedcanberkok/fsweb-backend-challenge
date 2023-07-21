const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')
const User = require('../Users/users-model');

const restricted = (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(tokenHeader, JWT_SECRET, (err, decodeToken) => {
        if (err) {
          res.status(401).json({ message: "Token gecersizdir" });
        } else {
          req.decodeToken = decodeToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

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
   
   //PayloadCheck Çalışıyor
   const payloadCheck = (req, res, next) => {
    try {
      let { username, password, email } = req.body;
      if (!username || !password || !email) {
        res.status(400).json({ message: "Eksik alan var" });
        return; // Hata durumunda işlemi sonlandır
      }
      if (username.trim().length < 3 || password.trim().length < 3) {
        res
          .status(400)
          .json({ message: "Kullanıcı adı ve şifre 3 karakterden az olamaz" });
        return; // Hata durumunda işlemi sonlandır
      } if (!email || !validateEmail(email)) {
            next ({status: 400, message: "Geçerli bir email giriniz."})
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailAvailable = async (req,res,next) => {
        const user = await User.getByEmail(req.body.email);
        if(!user) {
            next()
        } else {
            next({status:400, message: "Email is not available!.."})
        }

  }

module.exports = {
    isEmailAvailable,
    payloadCheck,
    validateEmail,
    restricted,
    generateToken,
}