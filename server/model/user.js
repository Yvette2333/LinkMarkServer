import mongoose from 'mongoose';
const { Schema } = mongoose;

const verifyCodeSchema = new Schema({
  expireTime: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  verifyCode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const VerifyCodeModel = mongoose.model('User_registers', verifyCodeSchema)

const signUpSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verifyCode: {
    type: String,
  } 
}, {
  timestamps: true
})

export const SignUpModel = mongoose.model('User_Signup', signUpSchema)
