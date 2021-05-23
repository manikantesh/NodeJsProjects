const express = require('express');
const bcrypt = require('bcryptjs');
var User = require('../user/user.js');
const jwt = require('jsonwebtoken');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

/**http://localhost:8080/api/auth/register */
router.post('/register',(req,res)=>{
    var hashedPassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    },(err,user)=>{
        if(err){
            return res.status(500).send('Thee was a problem while registration')
        }
        res.status(200).send('Registation Completed!')
    })
})

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            return res.status(500).send('Error on the server');
        }
        if(!user){
            return res.status(404).send('No user found');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid){
            return res.status(401).send({auth:false,token:null});
        }
        var token = jwt.sign({id:user._id},'hmm hmm',{expiresIn : 86400},()=>{
            res.status(200).send({auth:true,token:token});
        });
    });
})


router.get('/validate',(req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send('No Token Provided');
    }
    jwt.verify(token,'hmm hmm',(err,decoded)=>{
        if(err){
            return res.status(500).send({auth:false,message:'Failed Auth'});
        }
        User.findById(decoded.id,{password:0},(err,user)=>{
            if(err){
                return res.status(500).send('Some Problem');
            }
            if(!user){
                return res.status(404).send('No user found');
            }
            next();
            res.status(200).send(user);
        })
    })
})

module.exports = router;
