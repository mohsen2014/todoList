let  mongoose = require('mongoose');
const uuid = require('node-uuid');
const PassportLocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');
const VerificationToken = mongoose.model('VerificationToken');
const mail = require('../middleware/verificationMail')


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    state: 'deactive'
  };

  const newUser = new User(userData);
  User.create(userData,
    function(err ,user) {
      if (err) { return done(err); }
      let token = new VerificationToken({
        _userId: user.id
      });
      token.createVerificationToken(function(token){
        // console.log(token);
        new mail(user.email ,"Verificaton Email Test" ,"this is Text" ,"<h3> <a href='http://localhost:3000/verify/" + token + "' >Click this</a></h3>").sendMail(
          function(info){
            console.log("success: " + info);
          },
          function(err){
            return done(err)
          }
        )
      });
      return done(null);
    }
  )
});
