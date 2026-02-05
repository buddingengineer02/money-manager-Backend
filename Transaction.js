// models/Transaction.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: String,
  division: { type: String, enum: ["office", "personal"] },
  description: String,
  account: String
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
