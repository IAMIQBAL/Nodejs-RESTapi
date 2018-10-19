const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{type: String, required:true, unique:true},
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    contacts:{type:String, required:true},
    imei:{type:String, required:true}
});

module.exports = mongoose.model('Login', loginSchema)