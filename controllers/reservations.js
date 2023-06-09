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
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "restaurant",
      select: "name province tel",
    });
    if (!reservation) {
      return res.status(400).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: reservation });
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

    //keep table value
    const table = req.body.table;
    if (!table) {
      throw "table is required";
    }
    if (table < 1 || table > 3) {
      return res.status(400).json({
        success: false,
        message: `The table number is invalid`,
      });
    }
    delete req.body.table;

    //Check for existed reservation
    const existedReservations = await Reservation.findOne(req.body);

    //If the user is not an admin, they can only reserve up to 3 tables.
    if (existedReservations) {
      console.log(existedReservations.table + table);
      if (existedReservations.table + table > 3 && req.user.role !== "admin") {
        return res.status(400).json({
          success: false,
          message: `The reservation make reserved table more than 3`,
        });
      }
      const reservation = await Reservation.findByIdAndUpdate(
        existedReservations._id,
        { table: existedReservations.table + table },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({ success: true, data: reservation });
    } else {
      req.body.table = table;
    }

    const reservation = await Reservation.create(req.body);

    return res.status(200).json({ success: true, data: reservation });
  } catch (error) {
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
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }

    if (req.body.table) {
      if (req.body.table < 1 || req.body.table > 3) {
        return res.status(400).json({
          success: false,
          message: `The table number is invalid`,
        });
      }
    }
    console.log(req.body);
    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: reservation });
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
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    const restaurant = await Restaurant.findById(reservation.restaurant);
    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this reservation`,
      });
    }

    await reservation.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Reservation" });
  }
};
