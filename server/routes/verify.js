const express = require('express');
const mongoose = require('mongoose')
const router = new express.Router();

const VerificationToken = mongoose.model('VerificationToken');
const User = mongoose.model('User');
router.get('/verify/:token', (req, res ,next) => {
  let token = req.params.token;
  VerificationToken.findOne({token: token},(err ,result) =>{
    if(err){
      res.status(400).json({
        message: err.message
      });
      return true;
    }
    // console.log(result);
    User.update({_id: result._userId},
    {
      state: 'Active'
    },(err ,effect ,rowRes)=>{
      if(err){
        res.status(400).json({
          message: err.message
        });
        return true;
      }   
      res.redirect('/login');
    });
  })
});

module.exports = router;