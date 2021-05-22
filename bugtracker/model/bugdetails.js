const mongoose = require('mongoose');

var bugSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    assignee:{type:String},
    createtime:{type:Date,default:new Date()},
    closetime:{type:Date},
    status:{type:String},
});
/**
 * Created a schema and mapped with collection/table called user
 * Nodejs javascript object mapped with table
 */
module.exports = mongoose.model('bug',bugSchema);