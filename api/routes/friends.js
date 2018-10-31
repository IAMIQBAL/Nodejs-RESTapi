const express = require("express")
const router2 = express.Router();

const friends = require("../../models/friends")
const mongoose = require("mongoose")

router2.get('/:username/:password', (req, res, next) =>{
    const uname = req.params.username;
    const password = req.params.password;
    friends.find({"username": uname, "password":password})
    .exec()
    .then(doc=>{
        if (doc !=0 ){
            res.sendStatus(200).json({
                data:doc
            })
        } else {
            res.sendStatus(404).json({
                message: "User not found"
            })
        }
    }).catch(err=>{
        err.sendStatus(505)
    })
})

module.exports = router2