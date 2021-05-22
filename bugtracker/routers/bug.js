const express = require('express')
const Bug = require('../model/bugdetails')
const request = require('request')
const router = express.Router();

router.post('/add',(req,res)=>{
    let bugModel = new Bug();
    bugModel.title = req.body.title;
    bugModel.description = req.body.description;
    bugModel.assignee = req.body.assignee;

    bugModel.save((err,result)=>{
        if(err){
            throw error;
        }else{
            res.send('Successfully added')
        }
    })
})

router.get('/closebug/:id', (req,res)=>{
    const id = req.params.id
    console.log("id ==> ", id)
    Bug.findOneAndUpdate({_id:id}, { closetime: Date.now()}, (err, result)=> {
        if (err) {
            res.send(err);
          } else {
            res.redirect('/');
          }
    })
})

module.exports = router;