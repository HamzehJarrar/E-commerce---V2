import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false, 
  },
});