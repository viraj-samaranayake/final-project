const mongoose = require('mongoose');

const CommissionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  collectedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Commission', CommissionSchema);
