const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PublicationSchema = new Schema({
  creator_id: { type: Number, required: true },
  content: { type: String, required: true, max:140},
  createdAt: { type: Date, required: false, default: Date.now},
  updatedAt: { type: Date, required: false, default: Date.now},
});

module.exports = mongoose.model("Publications", PublicationSchema);
