const Restaurant = require("../models/Restaurant");

//@desc Get all Restaurants
//@route GET /api/v1/restaurants
//@access Public
exports.getRestaurants = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Get single restaurant
//@route GET /api/v1/restaurants/:id
//@access Public
exports.getRestaurant = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Create new restaurant
//@route POST /api/v1/restaurants
//@access Private
exports.createRestaurant = async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({ success: true, data: restaurant });
};

//@desc Update restaurant
//@route PUT /api/v1/restaurants/:id
//@access Private
exports.updateRestaurant = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Delete restaurant
//@route DELETE /api/v1/restaurants/:id
//@access Private
exports.deleteRestaurant = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
