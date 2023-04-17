import { CONVERSATION_SCHEMA, USER_SCHEMA } from "@/constants";
import { models, model, Schema, SchemaTypes } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const conversationSchema = new Schema(
  {
    members: [
      {
        type: SchemaTypes.ObjectId,
        ref: USER_SCHEMA,
      },
    ],
    messages: [
      {
        msgID: {
          type: String,
          default: uuidv4,
        },
        content: {
          text: String,
          file: String,
        },
        sender: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: USER_SCHEMA,
        },
        senderReact: String,
        receiverReact: String,
        originalMessage: {
          text: String,
          file: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastMessage: {
      text: String,
      file: String,
      sender: {
        type: SchemaTypes.ObjectId,
        ref: USER_SCHEMA,
      },
    },
  },
  { timestamps: true }
);

const Conversation =
  models.Conversation || model(CONVERSATION_SCHEMA, conversationSchema);

export default Conversation;
