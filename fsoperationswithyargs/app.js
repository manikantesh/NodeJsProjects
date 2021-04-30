const fs = require('fs');
const yargs = require('yargs').argv; 
const readline = require('readline');
const fileName = 'fileName.txt';

var operand1 = yargs.operand1 ? yargs.operand1 : yargs.a;

console.log('File Name: '+operand1);

checkFileandEnter();

function checkFileandEnter(){
    fs.readFile(fileName,function(err,data){
        if(err) throw err;
        if(!data.includes(operand1)){
            fs.writeFile(operand1,"You are Awesome!",function(err){
                if (err){
                    throw err;
                } 
                appendDatatoFileName();
                console.log('Message: Saved!');
            });
        }else{
            console.log('Error: File Exists Enter New Name')
        }
    })
}

function appendDatatoFileName(){
    fs.appendFile(fileName, operand1 +' \n', function(err){
        if(err){
            console.log(err)
        }else{
            console.log('Message: Appended!')
        }
    })
}