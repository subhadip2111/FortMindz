const Service = require('../models/Service');
const Saloon = require('../models/Saloon');
const Beautician=require('../models/BeauticianModel')
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('saloon');
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getServicesByBeautician = async (req, res) => {
  const beauticianId = req.params.beauticianId;

  try {
    // Find the beautician by ID
    const beautician = await Beautician.findById(beauticianId);
    if (!beautician) {
      return res.status(404).json({ message: 'Beautician not found' });
    }

    const services = await Service.find({ beautician: beauticianId }).populate({
      path: 'saloon',
      model: 'Saloon',
      select: 'name location address ratings' 
    });

    const result = {
      _id: beautician._id,
      name: beautician.name,
      services: services.map(service => ({
        _id: service._id,
        name: service.name,
        saloon: {
          _id: service.saloon._id,
          name: service.saloon.name,
          location: service.saloon.location,
          address: service.saloon.address,
          ratings: service.saloon.ratings
        }
      }))
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//Query Filter 
exports.searchServices = async (req, res) => {
  const { keyword, priceMin,priceMax, serviceType, rating } = req.query;
  try {
    let matchQuery = {};

    
    if (keyword) {
      matchQuery.$or = [
        { 'name': { $regex: new RegExp(keyword, 'i') } },
        { 'description': { $regex: new RegExp(keyword, 'i') } }
      ];
    }

    // Price range filter
    if (priceMin) {
      matchQuery.price = { $gte: parseFloat(priceMin) };
    }
    if (priceMax) {
      if (!matchQuery.price) matchQuery.price = {};
      matchQuery.price.$lte = parseFloat(priceMax);
    }

    // Service type filter
    if (serviceType) {
      matchQuery.type = { $regex: new RegExp(serviceType, 'i') };
    }

    // Rating filter
    if (rating) {
      matchQuery['saloon.ratings.average'] = { $gte: parseFloat(rating) };
    }

    const pipeline = [];

    if (Object.keys(matchQuery).length > 0) {
      pipeline.push({ $match: matchQuery });
    }

    pipeline.push({
      $lookup: {
        from: 'saloons', 
        localField: 'saloon',
        foreignField: '_id',
        as: 'saloon'
      }
    });

    pipeline.push({ $unwind: '$saloon' });

    pipeline.push({
      $lookup: {
        from: 'beauticians', 
        localField: 'saloon.beautician',
        foreignField: '_id',
        as: 'beautician'
      }
    });

    pipeline.push({ $unwind: '$beautician' });

  
    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        type: 1,
        saloon: {
          _id: 1,
          name: '$saloon.name',
          location: '$saloon.location',
          ratings: '$saloon.ratings'
        },
        beautician: {
          _id: '$beautician._id',
          name: '$beautician.name',
        }
      }
    });

    const services = await Service.aggregate(pipeline);

    res.json({ total: services.length, services });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.sortServices = async (req, res) => {
  const { sortBy } = req.query;
  try {
    let services = await Service.find().populate('saloons');
    if (sortBy === 'priceLowToHigh') {
      services.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      services.sort((a, b) => b.price - a.price);
    }
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
