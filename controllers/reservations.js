const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");

//@desc Get all reservations
//@route GET /api/v1/reservations
//@access Public
exports.getReservations = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
  }
};

//@desc Get single reservation
//@route GET /api/v1/reservations/:id
//@access Public
exports.getReservation = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
  }
};

//@desc Add reservation
//@route POST /api/v1/restaurants/:restaurantId/reservation
//@access Private
exports.addReservation = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Reservation" });
  }
};

//@desc Update reservation
//@route PUT /api/v1/reservations/:id
//@access Private
exports.updateReservation = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update Reservation" });
  }
};

//@desc Delete reservation
//@route DELETE /api/v1/reservations/:id
//@access Private
exports.deleteReservation = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Reservation" });
  }
};
