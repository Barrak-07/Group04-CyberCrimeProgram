const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator'); 

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); //.select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth
// @desc    Authenticate user & get token
// @access  public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials-email'}] });
        }

        //To verify password
        if(password != user.password){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials-pass'}] });
        }

        // Return jsonwebtoken
         const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, 
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }); 

        //res.send('User registered')

    } catch(err) {
        console.error(error.message);
        res.status(500).send('Server error');   
        //since this is the last res.status or res.json, return isn't needed
    }
});

module.exports = router;