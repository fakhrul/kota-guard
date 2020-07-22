const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    caption: {
      type: String,
    },
    body: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    visitor: {
      type: Schema.Types.ObjectId,
      ref: "Visitor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Remarks", schema);
