const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();

var auth= require('../services/authentication');

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select username, password, email from users where username=?";
    connection.query(query, [user.username], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into users (username,password,email) value (?,?,?)";
                connection.query(query, [user.username, user.password, user.email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Succeslfuly Registered" })
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Username already exists" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});


router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email, password from users where email = ?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorect email or password" });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h' });
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ message: "Something went wrong. Please try again later" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})




router.get('/checkToken', auth.authenticateToken, (req,res)=>{
    return res.status(200).json({message:"true"});
})

router.post('/changePassword', auth.authenticateToken, (req, res) => {
    const user = req.body;
    const email = res.locals.email;
    var query = "select * from users where email = ? and password = ?"
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Incorrect old password" });
            }
            else if (results[0].password == user.oldPassword) {
                query = "update users set password=? where email =?";
                connection.query(query, [user.newPassword,email], (err, results) => {
                    if(!err){
                        return res.status(200).json({message: "Succesfuly Changed Password"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Something went wrong. Please try again later" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;
