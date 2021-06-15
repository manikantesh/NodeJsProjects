const app = require('./app');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser =  require('body-parser');
const session = require('express-session');


app.use(session({
  secret: 'edurekaSecert', 
  resave: false,
  saveUninitialized: true}
  ));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

let sess;

app.get('/',(req,res) => {
    sess=req.session;
    sess.email=" "
    console.log(">>>>",sess.email);
    res.render('signin',
    { invalid: req.query.invalid?req.query.invalid:'',
        msg: req.query.msg?req.query.msg:''})
})

app.get('/admin',(req,res) => {
  sess=req.session;
  sess.email = "";

  res.render('adSignup',
    { invalid: req.query.invalid?req.query.invalid:'',
      msg: req.query.msg?req.query.msg:''})
})

const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});