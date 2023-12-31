const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel');

// @desc    Auth user & get token
// @route   POST /robowar/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        }); 
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc    Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    console.log(email);
    console.log(password);

    if ( !name || !email || !password ) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,

    });
    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});


// using query to search for players
// api /api/user?search=value
const allUsers = asyncHandler(async (req,res) => {
     const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i"}},
            { email: { $regex: req.query.search, $options: "i"}},
        ]
     } : {};

     const users = await User.find(keyword).find({
       _id: { $ne: req.user._id },
     });

     res.send(users);


    
});

module.exports = { authUser, registerUser, allUsers };