const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerController = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if (existingUser){
            return res.status(200).send({message:'User already exists',success:false});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword;
        console.log(req.body)
        req.body.state = req.body.state[0]
        req.body.blood = req.body.blood[0] 
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Registered Successfully',success:true})
        
    } catch(error){
        console.log(error)
        res.status(500).send({success:false, message:'Register controller'})
    }
}
const loginController = async(req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'User not found',success:false})
        }
        const isMatch= await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:'Invalid Password',success:false})
        }
        const token = jwt.sign({id:user._id},'XYZHS123',{expiresIn:'1d'});
        res.status(200).send({message:'Login Success',success:true,token})
    } catch(error){
        console.log(error)
        res.status(500).send({message:error.message})
    }
}

const searchController = async(req,res) =>{
    try {
        console.log('Inside search');
        const user = await userModel.findOne({name:req.body.name});
        
        if(!user){
            res.status(200).send({message:'User not found',success:false})
        }
        console.log(user);
        res.status(201).send({message:'Searched Successfully',success:true,data:user})

    } catch (error) {
        console.log(error);
             
    }
}

const authController = async(req,res) => {
    try {
        const user = await userModel.find({_id:req.body.userId})
        if(!user){
            res.status(200).send({
                message: "User not found",
                success:false
            })
        }
        else{
            res.status(200).send({
                success:true,
                data : {
                    name:user.name,
                    mail:user.email,
                },
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Auth Error",
            success:false,
            error
        })   
    }
}

module.exports = {loginController, registerController, searchController, authController}