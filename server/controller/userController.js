const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
    registerController: async (req, res) => {
        const {email, pass} = req.body
        try {
            const hash = await bcrypt.hash(pass, 10)
            const user = await new userSchema({
                email: email.toLowerCase(),
                pass: hash
            })
            await user.save()
            console.log('user', user.email, 'registered')
            res.send({success: true, message: "Registration completed. Now you can login."})
        } catch (err) {
            console.log(err)
        }
    },
    stayLoggedIn: async (req, res) => {
        const {stayLoggedIn} = req.session
        const {email} = req.session
        try {
            if (stayLoggedIn) {
                const findUser = await userSchema.findOne({email})
                if (findUser) return res.send({success: true, user: findUser.email})
            }
            res.send({success: false})
        } catch (err) {
            console.log(err)
        }
    },
    loginController: async (req, res) => {
        const {email, pass, stayLoggedIn} = req.body
        try {
            const findUser = await userSchema.findOne({email: email.toLowerCase()})
            if (findUser) {
                const compareResult = await bcrypt.compare(pass, findUser.pass)
                if (compareResult) {
                    req.session.email = email.toLowerCase()
                    req.session.stayLoggedIn = stayLoggedIn
                    return res.send({success: true, user: email, message: 'Login succeeded'})
                } else {
                    return res.send({success: false, message: 'Incorrect password'})
                }
            } else {
                return res.send({success: false, message: 'Incorrect email'})
            }
        } catch (err) {
            console.log(err)
        }
    },
}