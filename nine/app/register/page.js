import Navbar from "../../components/navbar";
export default function page() {
  return (
    <>
      <Navbar />
      <section class="vh-100 bg-image bg-secondary">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card">
                  <div class="card-body p-5 bg-light">
                    <h2 class="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form>
                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example1cg">
                          Name
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="tel"
                          id="form3Example3cg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example3cg">
                          Telephone
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example4cg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example4cg">
                          Email
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example4cdg">
                          Password
                        </label>
                      </div>

                      <div class="form-check d-flex justify-content-center mb-5">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label class="form-check-label" for="form2Example3g">
                          I agree all statements in{" "}
                          <a href="#!" class="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div class="d-flex justify-content-center">
                        <button
                          type="button"
                          class="btn btn-dark btn-block btn-lg gradient-custom-4"
                        >
                          Register
                        </button>
                      </div>
                      <p class="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="/login" class="fw-bold text-body">
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
