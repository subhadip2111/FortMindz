const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  beautician: { type: Schema.Types.ObjectId, ref: 'Beautician', required: true },
  saloon: { type: Schema.Types.ObjectId, ref: 'Saloon', required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
  languages: [{ type: String, required: true }],
  availability: {
    morning: [{ type: String, required: true }],
    afternoon: [{ type: String, required: true }]
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
