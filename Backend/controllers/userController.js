const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// Login User
const loginUser = async (req, res) => {
    const {email, password, role} = req.body

    try {
        const user = await User.login(email, password, role)
    
        // create a token
        const token = createToken(user._id)
    
        res.status(200).json({token, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//  Signup User
const signupUser = async (req, res) => {
const {name, email, password, role} = req.body


try {
    const user = await User.signup(name, email, password, role)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({token, user})
} catch (error) {
    res.status(400).json({error: error.message})
}
}

module.exports = {loginUser, signupUser}