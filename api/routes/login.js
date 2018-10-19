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
        username: req.body.username,
        password:req.body.password
    });
    user
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                createdUser: {
                    name: result.username,
                    password: result.password,
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

router.get('/:username',(req, res, next)=>{
    const uname = req.params.username;
    Login.find({"username":uname})
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if (doc) {
            res.status(200).json({
                user: doc,
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