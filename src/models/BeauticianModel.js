const mongoose = require('mongoose');

const BeauticianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  saloons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Saloon' }],
});

module.exports = mongoose.model('Beautician', BeauticianSchema);
