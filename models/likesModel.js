const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Likes", likesSchema);
