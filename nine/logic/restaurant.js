const API_URL = "http://localhost:5000/api/v1/restaurants";

const getRestaurants = async (page) => {
  const queryParams = new URLSearchParams({
    page,
    sort: "name",
  }).toString();

  const respone = await fetch(`${API_URL}?${queryParams}`, {
    method: "GET",
  });
  const result = await respone.json();
  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

const createRestaurants = async (userData) => {

}

module.exports = { getRestaurants, createRestaurants };
