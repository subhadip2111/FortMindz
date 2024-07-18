const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaloonSchema = new Schema({
  beautician: { type: Schema.Types.ObjectId, ref: 'Beautician', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  ratings: {
    average: { type: Number, required: true },
    reviews: { type: Number, required: true }
  },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = mongoose.model('Saloon', SaloonSchema);
