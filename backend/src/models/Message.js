import mongoose, { mongo, Mongoose } from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requrired: "true",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requrired: "true",
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000, 
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
