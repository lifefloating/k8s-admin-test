// models/Cluster.js
const mongoose = require('mongoose');

const ClusterSchema = new mongoose.Schema({
  clusterName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
});

module.exports = mongoose.model('Cluster', ClusterSchema);