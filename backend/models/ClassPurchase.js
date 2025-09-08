const mongoose = require('mongoose');

const ClassPurchaseSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  classSession: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSession', required: true },
  purchasedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClassPurchase', ClassPurchaseSchema);
