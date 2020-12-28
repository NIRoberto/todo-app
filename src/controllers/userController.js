import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {users} from '../database/models';
import Joi from '@hapi/joi';
import dotenv from 'dotenv';
dotenv.config();

const schema = {
    email: Joi.string().email().max(30).min(3).required(),
    password:Joi.string().min(5).max(15).required()
};
   export const signup = async (req, res) => {
    const { error } = Joi.validate(req.body, schema);
         
       if (error) {
          return  res.status(400).json({
            message: error.details[0].message
            })
       }
       
       const getUser = await users.findOne({ where: { email: req.body.email } });
           if (getUser) {
                return res.status(409).json({
                message: "Email exist have been taken",
            });
       }
       const salt = await bcrypt.genSalt(5);
       const hash = await bcrypt.hash(req.body.password, salt);
       const token  =  jwt.sign({ id:req.body.id, email: req.body.email }, process.env.TOKEN_SECRET);

       try {
            const data = await users.create({
                email: req.body.email,
                password: hash,
                
            })
           return res.status(201).json({
                message:"user created successfully and logged in ",
                data,
                token
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
}
export const login = async (req, res) => {
    const getUser = await users.findOne({ where: { email: req.body.email } });

    if (!getUser) {
                return res.status(400).json({
                message: "Incorrect email or password",
            });
    }
    const validPassword = await bcrypt.compare(req.body.password, getUser.password);
    if (!validPassword) {
              return res.status(400).json({
                message: "Incorrect email or password",
            });
    }
    const token  =  jwt.sign({ userId:getUser.id, email: req.body.email }, process.env.TOKEN_SECRET);

    
        try {
            return res.status(200).json({
                message: "login success",
                user: getUser,
                token
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
}
export const logout = async (req, res) => {


   const { token } = req.body;
   const refreshTokens = await refreshTokens.filter(token => t !== token);



   try {
            return res.status(200).json({
                message:"User logout successfully"
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
}
    //  delete user
    
export const deleteUser = async (req, res) => {

    const getUser = await users.findByPk( req.params.id );
    if (!getUser) {
        return res.status(404).json({
            error:"User doesn't exist"
        })
    }
    
    try {
        const deleteUser = await getUser.destroy({});
            return res.status(200).json({
                message:"user deleted successfully"
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
}