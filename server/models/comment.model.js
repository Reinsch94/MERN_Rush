const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  content: { type: String, required: true , max: 140},
  creator_id: { type: Number, required: true },
  article_id: { type: Number, required: true },
  createdAt: {type: Date, default: Date.now, required: true },
  updatedAt: {type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Article", CommentSchema);
