const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnAuthenticationError} = require('../error')


const register = async(req, res)=>{
    const user = await User.create({...req.body})
    const token =  user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name:user.name, token }})
}

const login = async(req, res)=>{
    const {email, password} = req.body
   
    if(!email || !password){
    throw new BadRequestError ('Email and Password is required') 
    }
    const user = await User.findOne({email})
   
    if(!user){
        throw new UnAuthenticationError('Invalid Credentials')
    } 
    
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
               throw new UnAuthenticationError('Password is Incorrect')
            }
    
    const token = user.createJWT()
 
    res.status(StatusCodes.OK).json({user:{email: user.email}, token})
}

module.exports = {register,login}
    