"use client";
import { register } from "../../logic/user";
import { useState } from "react";
import Navbar from "../../components/navbar";

const submit = async (e, userData) => {
  e.preventDefault();
  const result = await register(userData);
  if (result.success) {
    alert("register complete");
    window.location.href = "/login";
  } else {
    alert(result.msg);
  }
};

export default function page() {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

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
                      Create an account
                    </h2>

                    <form
                      onSubmit={(e) =>
                        submit(e, { name, telephone, email, password, role })
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
                        <label className="form-label">Name</label>
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
                          type="email"
                          id="form3"
                          className="form-control form-control-lg"
                          onChange={(event) => setEmail(event.target.value)}
                          value={email}
                          required
                        />
                        <label className="form-label">Email</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form4"
                          className="form-control form-control-lg"
                          onChange={(event) => setPassword(event.target.value)}
                          value={password}
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="form-outline mb-4">
                        <select
                          className="form-select form-select-lg"
                          name="role"
                          id="role"
                          onChange={(event) => setRole(event.target.value)}
                          value={role}
                        >
                          <option value="user">User</option>
                          <option value="res_owner">Restaurant Owner</option>
                        </select>
                        <label className="form-label">Role</label>
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
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>
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
