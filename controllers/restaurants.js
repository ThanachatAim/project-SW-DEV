const Restaurant = require("../models/Restaurant");

//@desc Get all Restaurants
//@route GET /api/v1/restaurants
//@access Public
exports.getRestaurants = async (req, res, next) => {
  try {
    let query;

    //Copy req.query
    const reqQuery = { ...req.query };

    //Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);
    // console.log(reqQuery);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);
    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    //finding resource
    query = Restaurant.find(JSON.parse(queryStr)).populate("reservations");

    //Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }
    //Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createAt");
    }
    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await Restaurant.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Execution query
    const restaurants = await query;

    //Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: restaurants.length,
      pagination,
      data: restaurants,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Get Owner restaurants
//@route GET /api/v1/restaurants/owner
//@access Public
exports.getOwnerRestaurants = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "admin" && role !== "res_owner") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to get owner's restaurants`,
      });
    }

    //finding resource
    query = Restaurant.find({ owner: req.user.id }).populate("reservations");
    query = query.sort("-createAt");

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await Restaurant.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Execution query
    const restaurants = await query;

    //Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: restaurants.length,
      pagination,
      data: restaurants,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Get single restaurant
//@route GET /api/v1/restaurants/:id
//@access Public
exports.getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (err) {
    res.status(400).json({ success: false });
  }
  res
  .status(200)
  .json({ success: true, msg: `Show restaurant ${req.params.id}` });
};

//@desc Create new restaurant
//@route POST /api/v1/restaurants
//@access Private
exports.createRestaurant = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "admin" && role !== "res_owner") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to create a restaurant`,
      });
    }
    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json({ success: true, data: restaurant });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

//@desc Update restaurant
//@route PUT /api/v1/restaurants/:id
//@access Private
exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
      });
    }

    const role = req.user.role;
    if (role !== "admin" && restaurant.owner.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this restaurant`,
      });
    }

    const new_restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!new_restaurant) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: new_restaurant });
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

//@desc Delete restaurant
//@route DELETE /api/v1/restaurants/:id
//@access Private
exports.deleteRestaurant = async (req, res, next) => {
  const role = req.user.role;
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
      });
    }

    if (role !== "admin" && restaurant.owner.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this restaurant`,
      });
    }

    restaurant.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
