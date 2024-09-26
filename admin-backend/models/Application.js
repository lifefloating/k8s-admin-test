// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  appName: { type: String, required: true },
  clusterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cluster', required: true },
  deployedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'deployed' },
});

module.exports = mongoose.model('Application', ApplicationSchema);