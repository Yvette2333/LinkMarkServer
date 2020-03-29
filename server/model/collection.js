import mongoose from 'mongoose';
const { Schema } = mongoose;

const collectionSchema = new Schema({
  title:{ 
    type: String, 
    required: true,
    default: ''
  },
  pageUrl:{
    type:String
  },
  selectedText:{
    type: String, 
  },
  favIconUrl:{
    type:String
  }
},{
  timestamps:true
})

export const CollectionSchema = mongoose.model('Koa' ,collectionSchema)