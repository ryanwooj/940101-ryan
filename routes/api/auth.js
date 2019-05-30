const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator/check');

// @route  GET api/AUTHs
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    //middleware validation
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is Required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //get Email and password from the requested
    const { email, password } = req.body;

    try {
      //See if user exists in Database
      let user = await User.findOne({ email });
      //유저가 확인되지 않으면 에러로 유저를 찾지 못했습니다. 라고 보내라.
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'No user Found' }] });
      }

      //비크립트로 한번 검사해봐라, 들어온 패스워드와 데이터베이스 상의 것이 일치하는지
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        //만약 매치가 아니라면, 패스워드가 맞지 않습니다. 라고 보내라
        return res.status(400).json({ errors: [{ msg: 'Password no match' }] });
      }

      //Return jsonwebtoken #frontend user status live
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
