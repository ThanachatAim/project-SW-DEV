"use client";
import { addReservation } from "@/logic/reservation";
import {
  deleteRestaurant,
  getRestaurants,
  updateRestaurant,
} from "@/logic/restaurant";
import { useEffect, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Navbar from "../../../components/navbar";

export default function page() {
  // pagination variable
  const [p, setP] = useState(1);
  const [jumpPage, setJumpPage] = useState("");
  const [data, setData] = useState(null);
  const [isnewPage, setIsnewPage] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("please login");
      window.location.href = "/login";
      return;
    }
    setP(1);
  }, []);

  useEffect(() => {
    if (isnewPage) {
      getRestaurants(p).then((result) => {
        setData(result.data);
      });
    }
    setIsnewPage(false);
  }, [p, isnewPage]);

  const movepage = (page) => {
    if (page > 0) {
      const value = parseInt(page);
      if (value !== p) setIsnewPage(true);
      setP(value);
      setJumpPage("");
    }
  };

  const deleteHandler = (id) => {
    deleteRestaurant(id)
      .then((result) => {
        if (result.success) {
          setIsnewPage(true);
        } else {
          alert("fail to delete");
        }
      })
      .catch((err) => console.log(err));
  };

  // modal variable
  const [active, setActive] = useState(false);
  const [selectData, setSelectData] = useState(null); // selected restaurantId
  // restaurant data
  const [open, setOpen] = useState("");

  const handleCloseModal = () => {
    // if (haveUpdate) {
    // updateRestaurant(selectData, {open})
    //     .then((result) => {
    //       console.log(result);
    //       if (!result.success) {
    //         alert(result.message);
    //       } else {
    //         alert("reservation complete");
    //       }
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // }
    console.log(open);
    setOpen("");
    setActive(false);
  };

  const handleShowModal = (value) => {
    setActive(true);
    setSelectData(value);
    console.log(value);
  };

  const updateHandler = (id) => {
    handleShowModal(id);
  };

  return (
    <>
      <Navbar />
      {data &&
        data.map((value, i) => {
          return (
            <div
              className="card bg-light my-2 mx-auto"
              style={{ width: "50rem" }}
              key={i}
            >
              <h5 className="card-header">
                <IoRestaurantOutline className="me-2" size={15} />
                {value.name}
              </h5>
              <div className="d-flex justify-content-end">
                <div className="card-body py-2 " style={{ maxWidth: "85%" }}>
                  <p className="card-text">
                    address : {value.address} district : {value.district}{" "}
                    province : {value.province}
                  </p>
                  <p className="card-text">
                    postalcode : {value.postalcode} tel : {value.tel} region :{" "}
                    {value.region}
                  </p>
                  <p className="card-text">
                    open time : {value.open} - {value.close} 
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary ms-auto my-auto "
                  style={{ width: "55px", height: "55px" }}
                  onClick={() => updateHandler(value._id)}
                >
                  <AiFillEdit />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger mx-1 my-auto"
                  style={{ width: "55px", height: "55px" }}
                  onClick={() => deleteHandler(value._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          );
        })}
      <nav aria-label="Page navigation example">
        <ul
          className="pagination justify-content-end "
          style={{ marginRight: "1cm" }}
        >
          <li className="page-item me-2">
            <a className="btn btn-dark" onClick={() => movepage(p - 1)}>
              Previous
            </a>
          </li>
          <li className="page-item disabled me-2">
            <a className="page-link">Current Page : {p}</a>
          </li>
          <li className="page-item me-2">
            <a className="btn btn-dark" onClick={() => movepage(p + 1)}>
              Next
            </a>
          </li>
          <li className="page-item disabled">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Jump to page :
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setJumpPage(event.target.value)}
                value={jumpPage}
                required
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => movepage(jumpPage)}
                >
                  Search
                </button>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <Modal show={active} onHide={handleCloseModal}>
        <Modal.Header closeButton id="head">
          <Modal.Title>Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="from_box"
            key="eventForm"
            style={{ flex: 1, paddingLeft: "10px" }}
          >
            <div className="form-group">
              <label className="my-1">Open Time</label>
              <input
                type="time"
                className="form-control"
                id="Inputdate"
                onChange={(event) => setOpen(event.target.value)}
                value={open}
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
