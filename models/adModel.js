const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    serviceName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      },
    city: {
        type: String,
        required: true,
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);