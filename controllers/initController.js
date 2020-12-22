const { User } = require("../model/User");
const { Invite } = require("../model/Invite")

module.exports = async (req, res) => {
  let user = await User.findOne({username: 'GOD'});
  if (user) {
    return res.status(400).json({ msg: "GOD Already Exists"});
  }

  User.collection.insertOne({
    username: 'GOD',
    password: Math.random.toString(36).substring(2,9)
  }, (err, doc) => {
    console.log(err);
  })

  user = await User.findOne({username: 'GOD'});

  const godsinvites = []
  for (let i = 0; i < 5; i++) {
    let invite = new Invite({
      userID: user._id
    });
    await invite.save();
    godsinvites.push(invite._id)
  }

  res.status(200).json({ status: 'ok', godsinvites })
}