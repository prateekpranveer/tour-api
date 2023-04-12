const express = require('express')
const User = require('../schemas/user')
const jwt = require('jsonwebtoken')


const router = express.Router();

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  return (false)
}

// Gets all the users
router.post('/register', async (req, res) => {
  try {
    const { emailId, password, userName, userLevel, phone } = req.body;
  // registration
  const userExists = await User.findOne({userName});
  if (userExists) {
    throw new Error ('UserName is taken');
  }
  const emailCorrect = ValidateEmail(emailId);
  if (emailCorrect) {
    const emailExist = await User.findOne({emailId});
    if (emailExist) {
      throw new Error('Email already exists');
    }
  }

  const user = new User ({
    name: req.body.name,
    emailId: emailId,
    password: password,
    userName: userName,
    rating: req.body.rating,
    phone: phone
  })
  await user.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.json({ message: err })
    })

  } catch(err) {
    res.status(400).send(err.message)
  }
  
})

// specific user
router.post('/login', async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const password = req.body.password;

    const emailIDFound = await User.findOne({emailId});
    if (!emailIDFound) {
      throw new Error('Invalid email or password')
    }
    if (password !== emailIDFound.password) {
      throw new Error('Invalid email or password')
    }
    const token = jwt.sign(
      {
        userId: User._id
      },
      'secret',
      {
        expiresIn: '1h'
      }
    )
    res.send({token});

  } catch(err) {
    res.status(400).send(err.message)
  }
})

module.exports = router;