const express = require("express")
const router = express.Router();

const friends = require("../../models/friends")
const mongoose = require("mongoose")

router.get('/:username/:password', (req, res, next) =>{
    const uname = req.params.username;
    const password = req.params.password;
    friends.find({"username": uname, "password": password})
    .exec()
    .then(doc=>{
        if (doc !=0 ){
            res.status(200).json({
                data:doc
            });
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    }).catch(err=>{
        err.status(505)
    })
})

module.exports = router