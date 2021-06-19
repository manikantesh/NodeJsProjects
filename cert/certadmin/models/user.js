const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    name: {type:String},
    email: {type:String},
    password: {type:String}
})

// model name : user
// collection name : user_list
module.exports = mongoose.model('user', user, 'user_list')