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
                    <h2 class="text-uppercase text-center mb-5">Login</h2>

                    <form>
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example3cg">
                          Email
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div class="d-flex justify-content-center">
                        <button
                          type="button"
                          class="btn btn-dark btn-block btn-lg gradient-custom-4"
                        >
                          Login
                        </button>
                      </div>
                      <p class="text-center text-muted mt-5 mb-0">
                        Create account?{" "}
                        <a href="/register" class="fw-bold text-body">
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
