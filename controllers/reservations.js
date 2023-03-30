const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");

//@desc Get all reservations
//@route GET /api/v1/reservations
//@access Public
exports.getReservations = async (req, res, next) => {
  const id = req.user.id;
  const role = req.user.role;
  try {
    let query;
    if (role !== "admin") {
      if (role === "user") {
        query = Reservation.find({
          user: id,
        }).populate({
          path: "restaurant",
          select: "name province tel",
        });
      } else {
        query = Restaurant.find(
          {
            owner: id,
          },
          "name province tel"
        )
          .sort({ name: 1 })
          .populate("reservations");
      }
    } else {
      //If you are an admin, you can see all!
      query = Reservation.find().populate({
        path: "restaurant",
        select: "name province tel",
      });
    }
    const reservation = await query;
    res.status(200).json({
      success: true,
      count: reservation.length,
      data: reservation,
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
    req.body.restaurant = req.params.restaurantId;

    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `No restaurant with the id of ${req.params.restaurantId}`,
      });
    }

    //add user Id to req.body
    req.body.user = req.user.id;

    //Check for existed appointment
    const existedReservations = await Reservation.find({ user: req.user.id });

    //If the user is not an admin, they can only create 3 appointment.
    if (existedReservations.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 reservations`,
      });
    }

    const reservation = await Reservation.create(req.body);

    res.status(200).json({ success: true, data: reservation });
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
