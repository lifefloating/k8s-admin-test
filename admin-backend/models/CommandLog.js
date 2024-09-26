// models/CommandLog.js
const mongoose = require('mongoose');

const CommandLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clusterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cluster', required: true },
  command: { type: String, required: true },
  executedAt: { type: Date, default: Date.now },
  output: { type: String },
  status: { type: String, default: 'success' },
});

module.exports = mongoose.model('CommandLog', CommandLogSchema);