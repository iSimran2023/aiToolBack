import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatId: { 
    type: String, 
    required: true,
    // index: true // ← critical for performance
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

promptSchema.index({ chatId: 1 });

export const Prompt = mongoose.model("Prompt", promptSchema);