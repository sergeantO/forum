const mongoose = require("mongoose");

const InviteSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = {
  Invite: mongoose.model("invite", InviteSchema)
}