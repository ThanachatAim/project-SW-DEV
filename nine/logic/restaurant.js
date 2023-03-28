const API_URL = "http://localhost:5000/api/v1/restaurants";

const getRestaurants = async (page) => {
  const queryParams = new URLSearchParams({
    page,
    sort: "name",
  }).toString();
  const token = localStorage.getItem("token");

  const respone = await fetch(`${API_URL}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await respone.json();
  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

module.exports = { getRestaurants };
