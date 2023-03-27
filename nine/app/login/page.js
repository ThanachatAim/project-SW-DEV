"use client";
import { login } from "@/logic/user";
import { useState } from "react";
import Navbar from "../../components/navbar";

const submit = async (e, userData) => {
  e.preventDefault();
  const result = await login(userData);
  if (result.success) {
    alert("login complete");
    window.location.href = "/";
  } else {
    alert(result.msg);
  }
};

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                    <form onSubmit={(e) => submit(e, { email, password })}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
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
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={(event) => setPassword(event.target.value)}
                          value={password}
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-dark btn-block btn-lg gradient-custom-4"
                        >
                          Login
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Create account?{" "}
                        <a href="/register" className="fw-bold text-body">
                          <u>Register here</u>
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
