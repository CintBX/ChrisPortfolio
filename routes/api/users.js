const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route   POST /users/register
// @descrip Register a new user
// @access  Temporary
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  };

  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: "This user already exists" });

      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(15, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              );
            });
        });
      });
    });
});

// @route   POST /users/login
// @descrip Log in existing user
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ msg: "Both email and password are required" });
  };

  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: "This user does not exist" });

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: "Incorrect password" });

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
    });
});

module.exports = router;