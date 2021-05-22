const express = require('express');
const orderRouter = require('./routers/order')
const PATH = require('path');
const db = require('./db'); // when the app starts db connection established
const app = express();
const PORT = process.env.PORT || 8080;

/** Telling the compiler to look for views folder for EJS */
app.set('views',PATH.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(PORT,()=>{
    console.log('Server listening on port', PORT);
});

app.get('/',(req,res)=>{
    res.render('initial',{title:'Order Management',version:'1.0.0'})
})

app.use('/order',orderRouter);