const Beautician=require('../models/BeauticianModel')

exports.getAllBeauticians = async (req, res) => {
    try {
        const beauticians = await Beautician.find().populate('saloons');
       return  res.json(beauticians);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get beautician by ID
exports.getBeauticianById = async (req, res) => {
    try {
        const beautician = await Beautician.findById(req.params.beauticianId).populate('saloons');
        if (!beautician) {
            return res.status(404).json({ message: 'Beautician not found' });
        }
        res.json(beautician);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};