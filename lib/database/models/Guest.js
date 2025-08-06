import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  partySize: {
    type: Number,
    required: true,
    min: 1,
  },
  phone: {
    type: String,
    trim: true,
  },
  isPriority: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["WAITING", "CALLED", "SEATED", "REMOVED"],
    default: "WAITING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  calledAt: {
    type: Date,
  },
  seatedAt: {
    type: Date,
  },
  quotedWait: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
});
guestSchema.index({ status: 1, isPriority: -1, createdAt: 1 });
guestSchema.index({ name: "text" });

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;
