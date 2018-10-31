const express = require('express');
const router = express.Router();

const Login = require('../../models/login');
const mongoose = require('mongoose');

router.post('/', (req, res, next) =>{

    const user = new Login({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password:req.body.password,
        contacts:req.body.contacts,
        imei:req.body.imei
    });
    user
        .save()
        .then(result =>{
            res.status(201).json({
                createdUser: {
                    name: result.username,
                    _id: result._id
                }
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:username/:password',(req, res, next)=>{
    const uname = req.params.username;
    const password = req.params.password;
    Login.find({"username":uname ,"password": password})
    .exec()
    .then(doc => {
        if (doc != 0) {
            res.status(200).json({
                data: doc
            });
        } else {
            res.status(404).json({
                message: 'User Not Found'
            })
        }
    })
    .catch(err =>{
        res.status(500).json({error: err})
    });
})

module.exports = router;