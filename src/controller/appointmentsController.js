const Appointment = require('../models/Appointment');

// Create a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { user, beautician, saloon, service, appointmentDate, status } = req.body;

    // Create new appointment instance
    const newAppointment = new Appointment({
      user,
      beautician,
      saloon,
      service,
      appointmentDate,
      status
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

