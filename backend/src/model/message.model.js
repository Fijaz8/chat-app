import mongoose from "mongoose";
import User from "./user.model.js";

const messageSchema=mongoose.Schema({

    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    RecieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    text:{
        type:String
    },
    Image:{
        type:String
    },
    
},{timestamp:true}
);

const message =mongoose.model("message",messageSchema);
export default message;