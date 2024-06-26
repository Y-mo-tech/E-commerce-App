const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./userSchema')
const secret = "Yunus@123c"

async function userRegister(req, res){
    const {email, password} = req.body
    
    console.log(email, password)
    if(!email || !password){
        return res.status(400).json({message : "Enter email and password properly"})
    }

    try{
        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(400).json({message : "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        console.log("hashed password-----", hashedPassword)


        const user = new User({
            email: email,
            password: hashedPassword
        })

        console.log(user)

        await user.save()
        
        const token = jwt.sign({userId : user._id}, secret, {expiresIn: "1h"})
        console.log("token===============>", token)

        return res.status(200).json({message: "User created successfully", token})

    } catch(err){
        return res.status(500).json(err.message)
    }
 
}

async function userLogin(req, res){
    let {email, password} = req.body
    try{
        if(!email || !password){
            return res.status(400).json({message : "Enter login credentials properly"})
        }
        const userLogin = await User.findOne({email : email})

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password)
            if(!isMatch){
               return res.status(400).json({error : "Incorrect Password"})
            }  
            else{
               const token = jwt.sign({userId : userLogin._id}, secret, {expiresIn: "15h"})

               return res.status(200).json({message : "Login Successfull", token})
            } 
        }
        else{
            return res.status(400).json({message : "Email doesn't exist"})
        }
    }catch(err){
     return res.status(500).send(err.message)
    }
}

module.exports = {
    userRegister,
    userLogin
}