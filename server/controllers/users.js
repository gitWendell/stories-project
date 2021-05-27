import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json({ type: 'failed', message: "User doesn't exist." })
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        
        if(!isPasswordCorrect) return res.status(400).json({ type: 'failed', message: "Invalid Credentials"}) 

        const token = jwt.sign({ email:existingUser.email, id:existingUser._id }, 'test', {expiresIn: "1h"} )

        res.status(200).json({ type: 'success', message: 'Sign in sucessfully', result: existingUser, token })
    } catch (error) {
        res.status(500).json({ type: 'failed', message: "Something went wrong. " })
    }
}

export const signup = async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({ type: 'failed', message: "User already exist. " })

        if(confirmPassword !== password) return res.status(400).json({ type: 'failed', message: "Password doesn't match. "})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign( { email: result.email, id:result._id }, 'test', {expiresIn: "1h"} )

        res.status(200).json({ type: 'success', message: 'Sign up sucessfully', result, token })

    } catch (error) {
        res.status(500).json({ type: 'failed', message: "Something went wrong. " }) 
    }

}