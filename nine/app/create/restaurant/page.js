"use client";
import { createRestaurants } from "@/logic/restaurant";
import { useState } from "react";
import Navbar from "../../../components/navbar";

const submit = async (e, userData) => {
  e.preventDefault();
  const result = await createRestaurants(userData);
  if (result.success) {
    alert("restaurant was created");
    window.location.href = "/";
  } else {
    alert(result.msg);
  }
};

export default function page() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("");

  return (
    <>
      <Navbar />
      <section className="vh-150 bg-image bg-secondary">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5 bg-light">
                    <h2 className="text-uppercase text-center mb-5">
                      Create a restaurant
                    </h2>

                    <form
                      onSubmit={(e) =>
                        submit(e, { name, address, district, province, postalcode, tel, region})
                      }
                    >
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form1"
                          className="form-control form-control-lg"
                          onChange={(event) => setName(event.target.value)}
                          value={name}
                          required
                        />
                        <label className="form-label">Restaurant name</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="address"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setAddress(event.target.value)}
                          value={address}
                          required
                        />
                        <label className="form-label">Address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="district"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setDistrict(event.target.value)}
                          value={district}
                          required
                        />
                        <label className="form-label">District</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="province"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setProvince(event.target.value)}
                          value={province}
                          required
                        />
                        <label className="form-label">Province</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="postalcode"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setPostalcode(event.target.value)}
                          value={postalcode}
                          required
                        />
                        <label className="form-label">Postalcode</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="tel"
                          id="form2"
                          className="form-control form-control-lg"
                          placeholder="xxx-xxx-xxxx"
                          onChange={(event) => setTel(event.target.value)}
                          value={tel}
                          required
                        />
                        <label className="form-label">Telephone</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="region"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setRegion(event.target.value)}
                          value={region}
                          required
                        />
                        <label className="form-label">Region</label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label className="form-check-label">
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-dark btn-block btn-lg gradient-custom-4"
                        >
                          Create restaurant
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/*
export default function page(params) {
  return (
    <>
      <Navbar />
      <div class="p-3 mb-2 bg-danger text-white">.bg-danger</div>
    </>
  );
}
*/