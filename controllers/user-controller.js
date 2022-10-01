// require User Schema
const User = require('../models/user');
const path = require('path');


// signin signup page
module.exports.signinSignup = async (req, res) => {

    // find user 
    let userEmail = await User.findOne({ email: req.body.email });

    // if esesist -> login
    if (userEmail) {
        res.cookie('user_id', userEmail._id)
    } else {
        // if not exesist -> create one
        let user = await User.create({
            email: req.body.email
        });
        // add user id to local cookies
        res.cookie('user_id', user._id);
    }
    return res.redirect('/') ;
}


// render signin page 
module.exports.signin = async (req, res) => {
    if (req.cookies.user_id) {
        let user = await User.findById(req.cookies.user_id);
        return res.redirect('/')
    } else {
        return res.render('signin', { title: "Habbit Tracker | Signin | Signup" });
    }
}


// logout controller
module.exports.logout = (req, res) => {
    // chear cookie and redirect to signin
    res.clearCookie("user_id");
    return res.redirect('signin');
}