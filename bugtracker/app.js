const express = require('express');
const bugRouter = require('./routers/bug')
const BugD = require('./model/bugdetails')
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
    BugD.find({}, function (err, result) {
        if(err) throw err
        //console.log("result ==> ", result)
        let status
        const bugs = result.map( bug =>{
            console.log("bug ==> ", bug)

            var result = new Date(bug.createtime);
            result.setDate(result.getDate() + 3);

            //const slaTime = bug.createtime + 259200000;
            var newDate = new Date();
            //var days = Math.floor((newDate-bug.createtime) / (3600*24));
            var color = '';
            console.log(result);
            if( bug.closetime == undefined ) {
                status = "OPEN"
            } else {
                status = "CLOSE"
                bug["closeTimeStr"] = new Date(bug.closetime).toLocaleString()
            }
            if(newDate>result && status == "OPEN"){
                days = 0;
                color = 'red';
            }
            bug["createTimeStr"] = new Date(bug.createtime).toLocaleString()
            bug["slaTimeStr"] = new Date(result).toLocaleString()
            //bug["daysleft"] = days
            bug["status"] = status
            bug["color"] = color
            return bug
        })
        //console.log("bugs ==> ", bugs)
        res.render('initial', {data:bugs,title:'Bug Tracking',version:'1.0.0'})
    })
    //res.render('initial',{data:bugs,title:'Bug Tracking'})
})

app.use('/bug',bugRouter);