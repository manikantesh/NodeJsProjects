const chalk = require('chalk');
const mongoose = require('mongoose');
const dbURL = "mongodb://127.0.0.1:27017/orders";

/**
 * 
 * Local DB Server: sudo mongod --dbpath /System/Volumes/Data/data/db

 */
mongoose.connect(dbURL,{useNewUrlParser:true}); //connected to MonogoDB

mongoose.connection.on('connected',()=>{
    console.log(chalk.green('Connected to MongoDB'));
})


mongoose.connection.on('error',()=>{
    console.log(chalk.red('Error connecting  to MongoDB'));
})

mongoose.connection.on('disconnected',()=>{
    console.log(chalk.red('Disconnecting from MongoDB'));
})