const express = require('express');
const router = express.Router();

const Login = require('../../models/login');
const mongoose = require('mongoose');

// router.get('/', (req, res, next) =>{
//     res.status(200).json({
//         message: 'Authenticated'
//     });
// });

router.post('/', (req, res, next) =>{
    // const newUser = {
    //     name: req.body.name,
    //     password: req.body.password
    // };
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
            console.log(result);
            res.status(201).json({
                createdUser: {
                    name: result.username,
                    _id: result._id
                }
            });
        })
        .catch(err =>{
            console.log(err);
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
        // console.log("Logged In")
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
        console.log(err); 
        res.status(500).json({error: err})
    });
    // if (userName == 'bilal'){
    //     res.status(200).json({
    //         message: 'Available'
    //     });
    // } else{
    //     res.status(200).json({
    //         message: (userName + ' Not Found')
    //     })
    // }
})

module.exports = router;