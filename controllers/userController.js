const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")

const { User } = require("../model/User");
const { Invite } = require("../model/Invite")

let signup = async (req, res) => {
  const {
      username,
      email,
      password,
      invite: inviteID
  } = req.body;

  try {
    var invite = await Invite.findOne({_id: inviteID})
    if (!invite) {
      return res.status(400).json({ msg: "Invite is incorrect"})
    }
  } catch (e) {
    return res.status(400).json({ msg: "Invite is incorrect", e });
  }

  try {
      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({ msg: "User Already Exists"});
      }

      const salt = await bcrypt.genSalt(10);
      const inviter = await User.findById(invite.userID);
      user = new User({
        inviter,
        username,
        email,
        password: await bcrypt.hash(password, salt)
      });

      await user.save();

      await Invite.findOneAndDelete({_id: inviteID})
      res.status(201).json({});
  } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
  }
}

let login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });

    const payload = {
      user: {
        id: user.id
      }
    };

    const accessToken = jwt.sign(
      payload,
      config.get('jwtSecret') ,
      {
        expiresIn: 60 * 60 * 24
      }
    )

    let data = {
      accessToken,
      id: user.id,
      username: user.username,
      inviter: user.inviter,
      createdAt: user.createdAt,
      email: user.email,
      image: user.image
    }
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
}

let userInfo = async (req, res) => {
  const userId = (req.params.userId === '0') ? req.user.id : req.params.userId
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      email: user.email,
      inviter: user.inviter,
      skills: user.skills,
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

let newInvite = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({
      message: "User Not Exist"
    });
  }

  let invite = new Invite({
      userID: user._id
  });

  await invite.save();

  res.status(200).json({
    invitation: invite._id
  });
}

let checkUsername = async (req, res) => {
  const username = req.params.username
  const user = await User.findOne({username});
  const valid = (user) ? false : true 
  res.status(200).json(valid);
}

let checkEmail = async (req, res) => {
  const email = req.params.email
  const user = await User.findOne({email});
  const valid = (user) ? false : true
  res.status(200).json(valid);
}

module.exports = {
  signup,
  login,
  userInfo,
  newInvite,
  checkUsername,
  checkEmail
}