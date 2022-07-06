const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['token']
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenVerify) {
            const userId = tokenVerify.id
            const user = await User.findOne({ userId })
            if(user.role === "admin"){
                next()
            }else{
                res.status(400).json({msg:"Only Admin Can Access This Page"})
            }
        }else{
            res.status(400).json({msg:"Failed To Verify Token"})
        }
    } catch (error) {
        res.status(400).json({ msg: "Invalid Token" })
    }
}