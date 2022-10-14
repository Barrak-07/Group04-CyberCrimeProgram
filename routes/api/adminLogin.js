//routes routes
const express = require('express');
const router = express.Router();
const config = require('config');
const Admin = require('../../models/Admin');
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin')
const jwt = require('jsonwebtoken');


const { check, validationResult } = require('express-validator'); 

router.post('/', async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await Admin.findOne({email,password});

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials-pass'}] });
        }
        
        if (password != user.password){
             return res.status(400).json({ errors: [{ msg: 'Invalid password'}] });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'String') {
            return res.status(404).json({ msg: 'user not found' });
        }
        res.status(500).send('Server error');
    }
  });



// // @route   GET api/auth/admin
// // @desc    Authenticate admin & get token
// // @access  public

// router.post('/', [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email,password} = req.body;

//     try {
//         // See if admin exists
//         let admin = await Admin.findOne({ email});

        

//         //To verify password
//         if(password != admin.password){
//             return res.status(400).json({ errors: [{ msg: 'Invalid credentials-password'}] });
//         }


//         // Return jsonwebtoken
//          const payload = {
//             admin: {
//                 id: admin.id
//             }
//         }

//         jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, 
//         (err, token) => {
//             if(err) throw err;
//             res.json({ token });
//         }); 

//         //res.send('User registered')

//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send('Server error');   
//         //since this is the last res.status or res.json, return isn't needed
//     }
// });





module.exports = router;