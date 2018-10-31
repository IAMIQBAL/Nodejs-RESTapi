const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{type: String, required:true, unique:true, validate:[validateEmail, "Please enter a valid email address"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    contacts:{type:String, required:true},
    imei:{type:String, required:true}
});

module.exports = mongoose.model('Login', loginSchema)