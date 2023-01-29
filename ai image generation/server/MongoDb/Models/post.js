import mongoose from "mongoose";
const post =new mongoose.Schema({

    name:{
        type:"string",
        required:true
    },
    prompt:{
        type:"string",
        required:true
    },
    photo:{
        type:"string",
        required:true
    },


})
const postschema =new mongoose.model('post',post);

export default postschema;