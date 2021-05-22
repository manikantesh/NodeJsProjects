const express = require('express')
const Order = require('../model/orderdetails')
const request = require('request')
const router = express.Router();

const mail = require('../mail')

router.post('/add',(req,res)=>{
    let orderModel = new Order();
    orderModel.name = req.body.name;
    orderModel.email = req.body.email;
    orderModel.address = req.body.address;
    orderModel.productName = req.body.productname;
    orderModel.price = req.body.price;
    orderModel.quantity = req.body.quantity;

    orderModel.save((err,result)=>{
        if(err){
            throw error;
        }else{
            res.send('Successfully added')
        }
    })
})

router.get('/orderTable',(req,res)=>{
    Order.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {

            const now = Date.now()
            let status
            let dat
            let sec
            const ord = allDetails.map(or =>{
                dat = Number(or.createdDate)
                sec = (now - dat)/1000
                if (sec<86400)        status = "In Progess"
                else if (sec>172800)  status = "Delivered"
                else                  status = "Dispatched"
                
                const d = new Date(dat).toLocaleDateString()
                console.log(d)
                or["orderstatus"] = status
                return or
            })
            console.log(ord);
            res.render('orderTable',{data:ord})
        }
    })
})

router.get('/sendMail/:email/:orderstatus', (req,res)=>{
    const email = req.params.email
    const orderstatus = req.params.orderstatus
    mail.sendEmail(email,'Your order status','<h1>'+orderstatus+'</h1>')
})

module.exports=router;