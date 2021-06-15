const express = require('express');
const router = express.Router();

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User_model');
const Orderlist = require('../models/Order_model')

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/public'));

const session = require('express-session');
router.use(session({secret: 'edurekaSecret1', resave: false, saveUninitialized: true}));

// admin addOneOrder
router.post('/addOneOrder', (req,res) => {
    const token = localStorage.getItem('authtoken')
    
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        
        if (err) res.redirect('/')
        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}

            const d = Date.now()
            const order = {...req.body, order_date: d }
            Orderlist.create(
                order
            , (err, data) => {
                if(err) return res.status(500).send('There was a problem registering user')
                const htmlMsg = encodeURIComponent('Added New Order DONE !');
                res.redirect('/admin/shoppingDashboard?msg=' + htmlMsg)
            })            
        });
    });
})


// add user
router.post('/addUser', (req, res) => {

    const token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
        res.redirect('/')
    };
        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) return res.status(500).send('Error on the server.');
                let htmlMsg
                if(!user){ //add new user
                    const hashedPasword = bcrypt.hashSync(req.body.password, 8);
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPasword,
                        role: req.body.role
                    }, (err, user) => {
                        if(err) return res.status(500).send('There was a problem registering user')
                        htmlMsg = encodeURIComponent('Added New User DONE !');
                        res.redirect('/admin/userDashboard?msg=' + htmlMsg)
                    })
                }else{ //duplicate
                    htmlMsg = encodeURIComponent('Email existing, please enter a new one ...');
                    res.redirect('/admin/userDashboard?msg=' + htmlMsg);
                }
            }) 
        });
    });
});

router.get('/shoppingDashboard', (req, res)=>{
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.redirect('/')
        };
            User.findById(decoded.id, { password: 0 }, (err, user) => {
                if (err) {res.redirect('/')}
                if (!user) {res.redirect('/')}
                
               Orderlist.find({}, (err,data)=>{
                if(err) res.status(500).send(err)
                else{
                        const now = Date.now()
                        let status
                        let d0
                        let sec
                        const orders = data.map( order => {
                            d0 = Number(order.order_date)
                            sec = (now - d0)/1000
                            if (sec<86400)        status = "In Progess"
                            else if (sec>172800)  status = "Delivered"
                            else                  status = "Dispatched"
                            
                            const d = new Date(d0).toLocaleDateString()
                            order["order_date"] = d
                            order["order_status"] = status
                            return order
                        })
    
                        res.render('shoppingDashboard.ejs', {
                            user,
                            data: orders,
                            msg: req.query.msg?req.query.msg:''
                        })
                }
            })
        });
    });
})

// admin user dashboard
router.get('/userDashboard', (req, res) => {
    
    const token = localStorage.getItem('authtoken')
    
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        
        if (err) res.redirect('/')
        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}

            User.find({}, (err,data)=>{
                if(err) res.status(500).send(err)
                else{
                    res.render('userDashboard.ejs', {
                        user,
                        data,
                        msg: req.query.msg?req.query.msg:''
                    })
                }
            })
        });
    });
});

module.exports = router