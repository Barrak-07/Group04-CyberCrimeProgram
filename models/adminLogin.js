const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
 
   
    password: {
        type: String,
        required: true
    }
});

module.exports = AdminLogin = mongoose.model('AdminLogin', AdminSchema);