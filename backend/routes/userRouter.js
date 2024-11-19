const express = require('express')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const userExist = await UserModel.findOne({ email })
        if (!userExist) {
            bcrypt.hash(password, 10, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    return res.json({
                        "msg": "Error while hashing",
                        "success": false
                    })
                }

                if (hash) {
                    const user = new UserModel({ userName: userName, email: email, password: hash })
                    await user.save()
                    res.json({
                        msg: "User register successfully",
                        "success": true,
                        "user": user
                    })
                }
            });
        } else {
            return res.json({
                msg: 'User alredy exist',
                "success": false
            })
        }
    } catch (err) {
        res.json({ "msg": "err while register", "err": err.message })
    }


})

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            bcrypt.compare(password, userExist.password, (err, result) => {
                if (err) {
                    return res.json({
                        msg: "err while compairing password",
                        "success": false
                    })
                }
                // result == true
                if (result) {
                    jwt.sign({ id: userExist._id, userName: userExist.userName }, "secret", (err, token) => {

                        if (err) {
                            return res.send(err)
                        }
                        res.json({
                            "msg": "User login successfully",
                            "success": true,
                            "token": token,
                            "user":userExist

                        })
                    });
                }else{
                    return res.json({
                        msg: "Wrong Password",
                        "success": false
                    })
                }
            });
        } else {
            return res.json({
                msg: "User Not Found {email}",
                "success": false
            })
        }


    } catch (err) {
        res.json({ "msg": "err while login", "err": err })
    }
})

module.exports = userRouter;