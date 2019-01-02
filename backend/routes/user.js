const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(result => {
    res.status(201).json({message:'Succes', result: result});
    console.log(result);
  })
  .catch( err => {
    res.status(500).json({error: err});
    console.log(err);
  });

});

router.post("/login", (req,res, next) =>{
User.findOne({email: req.body.email, password: req.body.password})
.then(user => {
 if (!user) {
   return res.status(400).json({
     message: "Auth failed"
   });

 }
 const token = jwt.sign({email: user.email, userId: user._id}, 'secret', {expiresIn: "4h"});
res.status(200).json({
  token: token, expiresIn: 3600, userId: user._id
});
})
.catch(err => {
  return res.status(401).json({
    message: "Auth failed"
  });
})
})


module.exports = router;
