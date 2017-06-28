const mongoose = require('mongoose');

const todo = new mongoose.Schema({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String , required: true},
  description: {type: String ,required: true}
}) 


module.exports = mongoose.model('todo', todo);
// exports.verificationTokenModel = mongoose.model('VerificationToken', verificationTokenSchema);