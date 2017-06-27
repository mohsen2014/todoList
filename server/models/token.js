// let mongoose = require('mongoose');
// console.log("token");
// // define the User model schema
// const TokenSchema = new mongoose.Schema({
//   userId: Number,
//   token: String
// });


// exports.Token = mongoose.model('Token', TokenSchema);



const mongoose = require('mongoose'),
uuid = require('node-uuid');


// Verification token model
const verificationTokenSchema = new mongoose.Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
});


verificationTokenSchema.methods.createVerificationToken = function (done) {
    var verificationToken = this;
    var token = uuid.v4();
    verificationToken.set('token', token);
    // verificationToken.set('_userId' ,mongoose.Types.ObjectId(id));
    verificationToken.save( function (err) {
        if (err) return done(err);
        return done(token);
        console.log("Verification token", verificationToken);
    });
};


verificationTokenSchema.methods.verifyUser = function(token, done) {
    verificationTokenModel.findOne({token: token}, function (err, doc){
        if (err) return done(err);
        userModel.findOne({_id: doc._userId}, function (err, user) {
            if (err) return done(err);
            user["verified"] = true;
            user.save(function(err) {
                done(err);
            })
        })
    })
}

module.exports = mongoose.model('VerificationToken', verificationTokenSchema);
// exports.verificationTokenModel = mongoose.model('VerificationToken', verificationTokenSchema);