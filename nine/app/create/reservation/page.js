"use client";
import { getRestaurants } from "@/logic/restaurant";
import { useEffect, useState } from "react";
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
        console.log(result.data);
        setData(result.data);
      });
    }
    setIsnewPage(false);
  }, [p]);

  const movepage = (page) => {
    if (page > 0) {
      const value = parseInt(page);
      if (value !== p) setIsnewPage(true);
      setP(value);
      setJumpPage("");
    }
  };

  // modal variable
  const [active, setActive] = useState(false);
  const [date, setDate] = useState("");
  const handleCloseModal = () => {
    if (date !== "") {
      console.log(date);
    }
    setDate("");
    setActive(false);
  };
  const handleShowModal = (value) => {
    setActive(true);
    console.log(value);
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
              <h5 className="card-header">{value.name}</h5>
              <div className="card-body pt-2 pb-0">
                <p className="card-text">
                  address : {value.address}, district : {value.district},
                  province : {value.province}, postalcode : {value.postalcode},
                  tel : {value.tel}, region : {value.region}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-dark my-1 ms-auto me-1"
                style={{ width: "7rem" }}
                onClick={() => handleShowModal({ ...value })}
              >
                Reserve
              </button>
            </div>
          );
        })}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a className="page-link" onClick={() => movepage(p - 1)}>
              Previous
            </a>
          </li>
          <li className="page-item disabled">
            <a className="page-link">Current Page : {p}</a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => movepage(p + 1)}>
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
                  className="btn btn-outline-secondary"
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