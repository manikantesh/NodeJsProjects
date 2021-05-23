const express = require('express');
const PATH = require('path');
const db = require('./db'); // when the app starts db connection established
const app = express();

const UserController = require('./user/UserController');
const AuthController = require('./auth/AuthController');
const AdminController = require('./admin/AdminController');

/** Telling the compiler to look for views folder for EJS */
app.set('views',PATH.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/users',UserController)
app.use('/api/auth',AuthController)
app.use('/admin',AdminController)

app.get('/',(req,res)=>{
    res.render('signin',{title:"**Sign In**"})
})

app.get('/admin',(req,res)=>{
    res.render('signin',{title:"**Sign In**"})
})

module.exports = app;