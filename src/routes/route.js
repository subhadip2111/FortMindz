const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllBeauticians,
  getBeauticianById,
} = require("../controller/beauticianController");
const {
  getAllServices,
  getServicesByBeautician,
  searchServices,
} = require("../controller/serviceController");
const {
  getAllSaloons,
  getSaloonById,
  getSaloonsByBeautician,
} = require("../controller/saloonController");
const { login, register } = require("../controller/authController");
const { bookAppointment } = require("../controller/appointmentsController");

// Basic Registration & Login API
router.post("/auth/register", register);
router.post("/auth/login", login);

// Beautician Endpoints
router.get("/beauticians", getAllBeauticians);
router.get("/beauticians/:beauticianId", getBeauticianById);

// Saloon Endpoints
router.get("/saloons", auth, getAllSaloons);
router.get("/saloons/:saloonId", auth, getSaloonById);
router.get("/saloons/beautician/:beauticianId", auth, getSaloonsByBeautician);

// Service Endpoints
router.get("/services", auth, getAllServices);
router.get("/services/beautician/:beauticianId", getServicesByBeautician);
router.get("/services/search", auth, searchServices);

// Appointments Endpoint
router.post("/appointments/book", auth, bookAppointment);

// Handling invalid endpoints
router.all("/*", (req, res) => {
  return res
    .status(404)
    .json({ status: false, message: "Endpoint Not Found" });
});

module.exports = router;
