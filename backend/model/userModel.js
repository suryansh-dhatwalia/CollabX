
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:[6,'Email must be long'],
        maxLength:[50,'Email must be short']
    },
    password:{
        type:String,
        required:true,
        select:false,
    }
})


userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign( {email:this.email} ,process.env.JWT_SECRET);
}

const User = mongoose.model('User',userSchema);

export default User;