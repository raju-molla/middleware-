const User =require('../models/user')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken');
const { json } = require('express');

const getAll = async(req,res)=>{
    try{
        const data = await User.find({isDelete: false});
        if(data.length){
            return res.json({
                data
            })
        }
        else{
            return res.json({
                mgs: "user is not found!"
            })
        }
        

    }
    catch(err){
        return res.json({
            err
        })
    }
}

const register = async(req,res)=>{
    try{
        const user = new User(req.body);
        const data = await user.save();
            return res.json({
                mgs: 'registation successfully!',
                data
            }) 
    }
    catch(err){
        return res.json({
            err
        })
    }
}


const login= async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(user){
            const isValid = await bcrypt.compare(password,user.password);
            if(isValid){
                const data ={
                    email: user.email,
                    userName: user.userName,
                    userType: user.userType
                }
                const token = jwt.sign(data,process.env.SECRATE_KEY,{expiresIn: "5h"});
                return res.json({
                    mgs: "login successfully!",
                    token
                })
            }
            else{
                return res.json({
                    mgs: "Wrong password!"
                })
            }
        }
        else{
            return res.json({
                mgs: "email is not found!"
            })
        }

    }
    catch(err){
        return res.json({
            err
        })
    }
}


const temporeryDelete = async(req,res)=>{
    try{
        const id= req.params.id;
        await User.findOneAndUpdate(
            {_id:id},
            {
                $set: {isDelete:true}
            },
            {
                multi:true
            }
        )
        return res.json({
            mgs: "data go to recycle bin!"
        })

    }
    catch(err){
        return res.json({
            err
        })
    }
    
}
const restore =async(req,res)=>{
    try{
        const id= req.params.id;
        await User.findOneAndUpdate(
            {_id:id},
            {
                $set: {isDelete: false}
            },
            {
                multi:true
            }
        )
        return res.json({
            mgs: "Restore properly"
        })

    }
    catch(err){
        return res.json({
            err
        })
    }
}
const userDelete = async(req,res)=>{
    try{
        const id = req.params.id;
        await User.findOneAndDelete(
            {_id:id}
        )
        return res.json({
            mgs: "Delete properly!"
        })

    }
    catch(err){
        return res.json({
            err
        })
    }
}

const userUpdate = async(req,res)=>{
    try{
        const id= req.params.id;
        await User.findOneAndUpdate(
            {_id:id},
            {
                $set: req.body
            },
            {
                multi: true
            }
        )
        return res.json({
            mgs: "user update succesfully!"
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
}

const passwordUpdate =async(req,res)=>{
    try{
        const id= req.params.id;
        const {password}= req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            {_id: id},
            {
                $set: {password:hashedPassword}
            },
            {
                multi: true
            }
        )
        return res.json({
            mgs: "password update successfully!"
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
}





module.exports={
    register,
    getAll,
    login,
    temporeryDelete,
    restore,
    userDelete,
    userUpdate,
    passwordUpdate
}