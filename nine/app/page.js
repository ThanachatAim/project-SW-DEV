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
        } else {
          alert("you do not have access to this feature");
        }
      } else {
        alert("please login");
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
            >
              <MdTableRestaurant className="me-2" size={30} />
              <a onClick={() => homeHandler("/create/reservation")}>
                Create New Restaurant Reservation
              </a>
            </div>
          </div>
          <div className="d-block">
            <div
              className="btn btn-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
            >
              <BsCardChecklist className="me-2" size={30} />
              <a onClick={() => homeHandler()}>View My Reservation</a>
            </div>
          </div>
          <div className="d-block">
            <div
              className="btn btn-outline-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
            >
              <BiRestaurant className="me-2" size={30} />
              <a onClick={() => homeHandler()}>Create New Restaurant</a>
            </div>
          </div>
          <div className="d-block">
            <div
              className="btn btn-dark btn-md btn-block my-1"
              style={{ width: "20rem" }}
            >
              <AiFillEye className="me-2" size={30} />
              <a onClick={() => homeHandler()}>View My Restaurant</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
