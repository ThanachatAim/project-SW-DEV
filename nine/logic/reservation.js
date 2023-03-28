const API_reservation_URL = "http://localhost:5000/api/v1/reservations";
const API_restaurant_URL = "http://localhost:5000/api/v1/restaurants";

const addReservation = async (restaurantId, date) => {
  const reserveDate = new Date(date);
  const token = localStorage.getItem("token");
  const respone = await fetch(
    `${API_restaurant_URL}/${restaurantId}/reservations/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reserveDate }),
    }
  );
  const result = await respone.json();
  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

module.exports = { addReservation };
