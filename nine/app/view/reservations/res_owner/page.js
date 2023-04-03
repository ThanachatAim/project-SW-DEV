"use client";
import Navbar from "../../../../components/navbar";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import { useEffect, useState } from "react";
import { deleteReservation, getReservations } from "@/logic/reservation";

export default function page() {
  const [allData, setAllData] = useState(null);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [showHead, setShowHead] = useState(false);
  const [update, setUpdate] = useState(false);
  // pagination variable
  const [p, setP] = useState(0);
  const [jumpPage, setJumpPage] = useState("");
  const [maxP, setMaxP] = useState(0);
  const [isnewPage, setIsnewPage] = useState(false);

  useEffect(() => {
    setUpdate(true);
  }, []);

  useEffect(() => {
    if (update) {
      getReservations().then((result) => {
        if (result.success) {
          setShow(false);
          setShowHead(false);
          if (result.data.length > 0) {
            setShowHead(true);
            setMaxP(result.data.length);
          }
          if (result.data[p].reservations.length > 0) {
            setShow(true);
            setData(result.data[p].reservations);
          }
          setAllData(result.data);
          setUpdate(false);
        } else {
          setShow(false);
          alert("please login");
          window.location.href = "/login";
        }
      });
    }
  }, [update]);

  useEffect(() => {
    if (isnewPage) {
      if (allData[p].reservations.length > 0) setShow(true);
      else setShow(false);
      setData(allData[p].reservations);
    }
    setIsnewPage(false);
  }, [p]);

  const movepage = (page) => {
    // console.log(page);
    if (page >= 0) {
      const value = parseInt(page);
      if (value !== p && value < maxP) {
        setIsnewPage(true);
        setP(value);
      }
      setJumpPage("");
    }
  };

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
          <h6 className="border-bottom pb-2 mb-0">
            {showHead && `All reservation at ${allData[p].name} restaurant`}
          </h6>
          {show ? (
            data.map((reservation, i) => {
              const value = reservation.reserveDate;
              const date = new Date(value);
              const res_date = date.getDate();
              const res_month = date.getMonth() + 1;
              const res_year = date.getFullYear();
              return (
                <div key={`res#${i}`} className="d-flex text-muted pt-3">
                  {svgColor(i)}
                  <p className="py-2 mb-0 small lh-sm border-bottom ">
                    <strong className="d-block text-gray-dark mb-1">
                      User : {reservation.user} @ {res_date}/{res_month}/
                      {res_year}
                    </strong>
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-auto"
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
      <nav aria-label="Page navigation example">
        <ul
          className="pagination justify-content-end"
          style={{ marginRight: "1cm" }}
        >
          <li className="page-item me-2">
            <a className="btn btn-dark" onClick={() => movepage(p - 1)}>
              Previous
            </a>
          </li>
          <li className="page-item disabled me-2">
            <a className="page-link">Current Page : {p + 1}</a>
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
    </>
  );
}
