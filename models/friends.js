const mongoose = require("mongoose")

const friendsSchema = mongoose.Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
    friends: {type: Array}
})

module.exports = mongoose.model("Friends", friendsSchema)