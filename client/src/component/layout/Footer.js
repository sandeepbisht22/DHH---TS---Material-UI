import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white my-4">
      <div className="container p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-light m-1"
            href="https://www.facebook.com/sandeep.bisht.9212301/"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light m-1"
            href="https://twitter.com/Engg_hu_mai"
            role="button"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light m-1"
            href="https://www.instagram.com/sandeep0_obisht/"
            role="button"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light m-1"
            href="https://www.linkedin.com/in/sandeep-bisht-114429141/"
            role="button"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light m-1"
            href="https://github.com/sandeepbisht22"
            role="button"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example21"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form5Example21">
                    Email address
                  </label>
                </div>
              </div>

              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mb-4">
          <p>Let's explore DESI HIP HOP together and</p>
        </section>
      </div>
    </footer>
  );
};
export default Footer;
