const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    address:{type:String},
    productName:{type:String},
    price:{type:String},
    quantity:{type:String},
    createdDate:{type:Date,default:new Date()}
});
/**
 * Created a schema and mapped with collection/table called user
 * Nodejs javascript object mapped with table
 */
module.exports = mongoose.model('order',orderSchema);