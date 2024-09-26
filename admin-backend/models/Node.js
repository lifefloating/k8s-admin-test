// models/Node.js
const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  nodeName: { type: String, required: true },
  clusterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cluster', required: true },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Node', NodeSchema);