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
  const [telephone, setTelephone] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Navbar />
      <section className="vh-100 bg-image bg-secondary">
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
                        submit(e, { name, telephone, location, password, role })
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
                          type="tel"
                          id="form2"
                          className="form-control form-control-lg"
                          placeholder="xxx-xxx-xxxx"
                          onChange={(event) => setTelephone(event.target.value)}
                          value={telephone}
                          required
                        />
                        <label className="form-label">Telephone</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="location"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setLocation(event.target.value)}
                          value={location}
                          required
                        />
                        <label className="form-label">Location</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="description"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setDescription(event.target.value)}
                          value={description}
                          required
                        />
                        <label className="form-label">Restaurant description</label>
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