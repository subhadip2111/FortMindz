const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusEnum = ['pending', 'cancelled', 'completed'];

const AppointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  beautician: { type: Schema.Types.ObjectId, ref: 'Beautician', required: true },
  saloon: { type: Schema.Types.ObjectId, ref: 'Saloon', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: statusEnum, default: 'pending', required: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
