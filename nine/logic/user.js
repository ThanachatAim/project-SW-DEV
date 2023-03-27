const API_URL = "http://localhost:5000/api/v1/auth";

const register = async (userData) => {
  const respone = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await respone.json();

  if (!respone.ok) {
    return result;
  } else {
    return result;
  }
};

const login = async (userData) => {
  const respone = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await respone.json();

  if (!respone.ok) {
    return result;
  } else {
    localStorage.setItem("token", result.token);
    return result;
  }
};

const logout = async () => {
  localStorage.removeItem("token");
};

module.exports = { register, login, logout };
