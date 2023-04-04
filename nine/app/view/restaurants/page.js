"use client";
import { addReservation } from "@/logic/reservation";
import {
  deleteRestaurant,
  getOwnerRestaurants,
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
      getOwnerRestaurants(p).then((result) => {
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
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [region, setRegion] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");

  const handleCloseModal = () => {
    let haveUpdate = false;
    let updateField = {};
    if (name !== "") {
      updateField.name = name;
      haveUpdate = true;
    }
    if (address !== "") {
      updateField.address = address;
      haveUpdate = true;
    }
    if (district !== "") {
      updateField.district = district;
      haveUpdate = true;
    }
    if (province !== "") {
      updateField.province = province;
      haveUpdate = true;
    }
    if (postalcode !== "") {
      updateField.postalcode = postalcode;
      haveUpdate = true;
    }
    if (telephone !== "") {
      updateField.telephone = telephone;
      haveUpdate = true;
    }
    if (region !== "") {
      updateField.region = region;
      haveUpdate = true;
    }
    if (open !== "") {
      updateField.open = open;
      haveUpdate = true;
    }
    if (close !== "") {
      updateField.close = close;
      haveUpdate = true;
    }
    if (haveUpdate) {
      updateRestaurant(selectData, updateField)
        .then((result) => {
          console.log(result);
          if (!result.success) {
            alert(result.message);
          } else {
            alert("update restaurant complete");
            setIsnewPage(true);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    console.log(typeof open);
    setName("");
    setAddress("");
    setDistrict("");
    setProvince("");
    setPostalcode("");
    setTelephone("");
    setRegion("");
    setOpen("");
    setClose("");
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
                  <p className="card-text my-0">
                    address : {value.address} district : {value.district}{" "}
                    province : {value.province}
                  </p>
                  <p className="card-text my-0">
                    postalcode : {value.postalcode} tel : {value.telephone} region :{" "}
                    {value.region}
                  </p>
                  <p className="card-text my-0">
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
      <nav className="my-2" aria-label="Page navigation example">
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
              <label className="form-label my-1">Restaurant name</label>
              <input
                type="text"
                id="form1"
                className="form-control form-control-lg"
                onChange={(event) => setName(event.target.value)}
                value={name}
                required
              />
              <label className="form-label my-1">Address</label>
              <input
                type="address"
                id="form2"
                className="form-control form-control-lg"
                onChange={(event) => setAddress(event.target.value)}
                value={address}
                required
              />
              <label className="form-label my-1">District</label>
              <input
                type="district"
                id="form3"
                className="form-control form-control-lg"
                onChange={(event) => setDistrict(event.target.value)}
                value={district}
                required
              />
              <label className="form-label my-1">Province</label>
              <input
                type="province"
                id="form4"
                className="form-control form-control-lg"
                onChange={(event) => setProvince(event.target.value)}
                value={province}
                required
              />
              <label className="form-label my-1">Postalcode</label>
              <input
                type="postalcode"
                id="form5"
                className="form-control form-control-lg"
                onChange={(event) => setPostalcode(event.target.value)}
                value={postalcode}
                required
              />
              <label className="form-label my-1">Telephone</label>
              <input
                type="tel"
                id="form6"
                className="form-control form-control-lg"
                placeholder="xxx-xxx-xxxx"
                onChange={(event) => setTelephone(event.target.value)}
                value={telephone}
                required
              />
              <label className="form-label my-1">Region</label>
              <input
                type="region"
                id="form7"
                className="form-control form-control-lg"
                onChange={(event) => setRegion(event.target.value)}
                value={region}
                required
              />
              <label className="form-label my-1">Open Time</label>
              <input
                type="time"
                className="form-control"
                id="Inputdate1"
                onChange={(event) => setOpen(event.target.value)}
                value={open}
              />
              <label className="form-label my-1">Close time</label>
              <input
                type="time"
                className="form-control"
                id="Inputdate2"
                onChange={(event) => setClose(event.target.value)}
                value={close}
              />
            </div>
            <button
              className="btn btn-dark my-2"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
