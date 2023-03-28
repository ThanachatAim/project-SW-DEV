"use client";
import { logout } from "@/logic/user";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function navbar() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  });

  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            <h5>Nine (Restaurant Reservation)</h5>
          </a>
          <div className="d-flex text-white" role="search">
            {token ? (
              <>
                <a className="nav-link me-3" href="/" onClick={logout}>
                  <h5>
                    <FaSignOutAlt className="me-1" />
                    Logout
                  </h5>
                </a>
              </>
            ) : (
              <>
                <a className="nav-link me-3" href="/login">
                  <h5>
                    <FaSignInAlt className="me-1" />
                    Login
                  </h5>
                </a>

                <a className="nav-link text-white me-3" href="/register">
                  <h5>
                    <FaUser className="me-1" />
                    Register
                  </h5>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
