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

const createRestaurants = async (restaurantData) => {
  const token = localStorage.getItem("token");

  const respone = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurantData),
  });

  const result = await respone.json();
  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

const updateRestaurant = async (restaurantId, restaurantData) => {
  const token = localStorage.getItem("token");

  const respone = await fetch(`${API_URL}/${restaurantId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurantData),
  });

  const result = await respone.json();
  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

const deleteRestaurant = async (restaurantId) => {
  const token = localStorage.getItem("token");

  const respone = await fetch(`${API_URL}/${restaurantId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await respone.json();

  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

module.exports = {
  getRestaurants,
  createRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
