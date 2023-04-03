"use client";
import Navbar from "../../../../components/navbar";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  deleteReservation,
  getReservations,
  updateReservation,
} from "@/logic/reservation";

export default function page() {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(true);
  }, []);

  useEffect(() => {
    if (update) {
      getReservations().then((result) => {
        if (result.success) {
          setShow(false);
          if (result.data.length > 0) setShow(true);
          setData(result.data);
          setUpdate(false);
        } else {
          setShow(false);
          alert("please login");
          window.location.href = "/login";
        }
      });
    }
  }, [update]);

  const deleteHandler = (id) => {
    deleteReservation(id)
      .then((result) => {
        if (result.success) {
          setUpdate(true);
        } else {
          alert("fail to delete");
        }
      })
      .catch((err) => console.log(err));
  };

  // modal variable
  const [active, setActive] = useState(false);
  const [date, setDate] = useState("");
  const [reservationId, setReservationId] = useState(null);
  const handleCloseModal = () => {
    if (date !== "") {
      updateReservation(reservationId, date)
        .then((result) => {
          if (result.success) {
            setUpdate(true);
          } else {
            alert("fail to update");
          }
        })
        .catch((err) => console.log(err));
    }
    setDate("");
    setActive(false);
  };

  const handleShowModal = (value) => {
    setActive(true);
    setReservationId(value);
    console.log(value);
  };

  const updateHandler = (id) => {
    handleShowModal(id);
  };

  const svgColor = (i) => {
    let color = "#6f42c1";
    if (i % 3 === 1) {
      color = "#007bff";
    } else if (i % 3 === 2) {
      color = "#e83e8c";
    }
    return (
      <svg
        className="bd-placeholder-img flex-shrink-0 me-2 rounded my-auto"
        width="32"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 32x32"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill={color}></rect>
        <text x="50%" y="50%" fill={color} dy=".3em">
          32x32
        </text>
      </svg>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-0">Your Reservation</h6>
          {show ? (
            data.map((reservation, i) => {
              const value = reservation.reserveDate;
              const date = new Date(value);
              const res_date = date.getDate();
              const res_month = date.getMonth() + 1;
              const res_year = date.getFullYear();
              const restaurant = reservation.restaurant;
              return (
                <div key={`res#${i}`} className="d-flex text-muted pt-3">
                  {svgColor(i)}
                  <p className="pb-2 mb-0 small lh-sm border-bottom ">
                    <strong className="d-block text-gray-dark mb-1">
                      {restaurant.name} @ {res_date}/{res_month}/{res_year}
                    </strong>
                    <MdLocationCity className="ms-2" size={18} /> :{" "}
                    {restaurant.province}{" "}
                    <BsFillTelephoneFill className="ms-2" /> : {restaurant.tel}
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-auto"
                    onClick={() => updateHandler(reservation._id)}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-1"
                    onClick={() => deleteHandler(reservation._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              );
            })
          ) : (
            <>
              <div>
                <p className="pb-3 my-3 small lh-sm border-bottom ">
                  <strong className="d-block text-gray-dark text-center">
                    No Reservation
                  </strong>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal show={active} onHide={handleCloseModal}>
        <Modal.Header closeButton id="head">
          <Modal.Title>Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="from_box"
            key="eventForm"
            style={{ flex: 1, paddingLeft: "10px" }}
          >
            <div className="form-group">
              <label className="my-1">Reservation Date</label>
              <input
                type="date"
                className="form-control"
                id="Inputdate"
                onChange={(event) => setDate(event.target.value)}
                value={date}
              />
            </div>
            <button
              className="btn btn-dark my-2"
              onClick={() => {
                handleCloseModal();
              }}
            >
              submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
