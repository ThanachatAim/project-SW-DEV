const express = require("express");
const {
  getRestaurants,
  getOwnerRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");

//Include other resource routers
const reservationRouter = require("./reservations");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:restaurantId/reservations/", reservationRouter);

router
  .route("/")
  .get(getRestaurants)
  .post(protect, authorize("admin", "res_owner"), createRestaurant);

router
  .route("/owner")
  .get(protect, authorize("admin", "res_owner"), getOwnerRestaurants);

router
  .route("/:id")
  .get(getRestaurant)
  .put(protect, authorize("admin", "res_owner"), updateRestaurant)
  .delete(protect, authorize("admin", "res_owner"), deleteRestaurant);

module.exports = router;
