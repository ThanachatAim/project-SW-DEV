"use client";
import Navbar from "../components/navbar";
import { MdTableRestaurant } from "react-icons/md";
import { BiRestaurant } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { getUser } from "@/logic/user";

export default function page() {
  const homeHandler = async (path) => {
    const token = localStorage.getItem("token");
    if (!token) alert("please login to use features");
    else {
      const result = await getUser(token);
      if (result.success) {
        const role = result.data.role;
        console.log(role);
        if (role === "admin") {
          window.location.href = path;
          return;
        }
        if (path === "/create/reservation" && role === "user") {
          window.location.href = path;
        } else if (path === "/view/reservations") {
          window.location.href = `${path}/${role}`;
        } else if (path === "/create/restaurant" && role === "res_owner") {
          window.location.href = path;
        } else if (path === "/view/restaurants" && role === "res_owner") {
          window.location.href = path;
        } else {
          alert("you do not have access to this feature");
        }
      } else {
        alert("please login again");
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="card text-center">
        <div className="card-body">
          <h1 className="card-title">Nine: A Restaurant</h1>
          <h1 className="caard-title">Resevation System</h1>
          <p className="card-text">Please choose from an option below</p>
          <div className="d-block">
            <div
              className="btn btn-outline-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
              onClick={() => homeHandler("/create/reservation")}
            >
              <p className="m-0">
                <MdTableRestaurant className="me-2" size={30} />
                Create New Restaurant Reservation
              </p>
            </div>
          </div>
          <div className="d-block">
            <div
              className="btn btn-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
              onClick={() => homeHandler("/view/reservations")}
            >
              <p className="m-0">
                <BsCardChecklist className="me-2" size={30} />
                View My Reservation
              </p>
            </div>
          </div>
          <div className="d-block">
            <div
              className="btn btn-outline-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
              onClick={() => homeHandler("/create/restaurant")}
            >
              <p className="m-0">
                <BiRestaurant className="me-2" size={30} />
                Create New Restaurant
              </p>
            </div>
          </div>
          <div className="d-block">
            <div
              className="btn btn-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
              onClick={() => homeHandler("/view/restaurants")}
            >
              <p className="m-0">
                <AiFillEye className="me-2" size={30} />
                View My Restaurant
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
