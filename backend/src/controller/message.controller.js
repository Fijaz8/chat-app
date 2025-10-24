import message from "../model/message.model.js";
import User from "../model/user.model.js";
import cloudinary from "cloudinary";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const response = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(`error in get User For SideBar ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

    export const getmessagehistory = async (req, res) => {
    try {
        const { id: usertoCHat } = req.params;
        const myid = req.user._id;
        const response = await message.find({
        $or: [
            { SenderId: usertoCHat, RecieverId: myid },
            { RecieverId: usertoCHat, SenderId: myid },
        ],
        });

        return res.status(200).json( response );
    } catch (error) {
        return res.status(500).json({ error });
    }
    };


export const sendMessage = async(req,res)=>{
    try {
        const { id: usertoCHat } = req.params;
         const myid = req.user._id;
         const {text ,Image}= req.body;
        let ImageUrl;
         if(Image){
        const  uploadresponse=await cloudinary.v2.uploader.upload(Image)
            ImageUrl=uploadresponse.secure_url;
    }
    const newMessage= message({
        SenderId:myid,
        RecieverId:usertoCHat,
        text,
        Image:ImageUrl

    })
    await newMessage.save();
    return res.status(201).json(newMessage);
 }catch (error) {
        return res.status(500).json({"message":error});
    }
}
