const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_TOKEN = 'ADDFDdfgdfgsdddfdf';
// validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}
// end
// it is middleware to verify token
const verifyToken = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verifiedUser = jwt.verify(token, SECRET_TOKEN);
        req.user = verifiedUser;
        next(); 
    }catch(err){
        res.status(400).send('Invalid token');
    }

}

router.post('/register', async (req,res) => {
    // validate the data before create user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error);
   // checking if email already exist 
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email Already exist!');
   
   // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashPassword
   })
   try{  
        const savedUser = await user.save();
        res.send(savedUser);
   }catch(err){
        res.send(err);
   }
   
});

router.post('/login', async (req,res) => {
    // validate the data before create user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error);
   // checking if email already exist 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email not exist!');

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('wrong password!!');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, SECRET_TOKEN);
    res.header('auth-token', token);

    res.send('logged IN!');
});
// verifyToken
router.get('/list', async (req, res) => {
    try{
        console.warn(req.user)
        const users = await User.find({});
        res.json(users);
    }catch(err){
        res.send(err);
    }
    
});

module.exports = router;