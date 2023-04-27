import { NOTIFICATION_SCHEMA, USER_SCHEMA } from "@/constants";
import { Schema, SchemaType, SchemaTypes } from "mongoose";

const notificationSchema = new Schema(
  {
    type: String,
    user: {
      type: SchemaTypes.ObjectId,
      ref: USER_SCHEMA,
    },
    seen: {
      type: false,
      default: false,
    },
    content: SchemaTypes.ObjectId,
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model(NOTIFICATION_SCHEMA, notificationSchema);

export default Notification;
