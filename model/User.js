const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        min: 3,
        max: 50,
    },
   
    email:{
        type: String,
        required: [true, 'Please provide a email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],
        unique: true,
        max: 50,
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        min: 6,
        max: 50,
    }
}
    

)

UserSchema.pre('save', async function(){
const salt =  await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId:this._id,
    name:this.name},
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_LIFETIME}
    )
}


UserSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error
    }

}




module.exports = mongoose.model('User', UserSchema)

