import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            <h5>Nine (Restaurant Reservation)</h5>
          </a>
          <div className="d-flex text-white" role="search">
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
          </div>
        </div>
      </nav>
    </>
  );
}
