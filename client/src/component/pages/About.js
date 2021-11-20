import React from "react";
import devProfile from "../../resources/images/me and the mountain call.JPG";
const About = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#272727" }}>
      <div className="row">
        <div
          className="col-6  pb-5 my-5 d-flex justify-content-center align-items-center"
          style={{ borderColor: "black !important", height: "60vh" }}
        >
          <img
            src={devProfile}
            alt=""
            className="rounded-circle border border-3"
            style={{ height: "50vh", width: "53vh" }}
          />
        </div>
        <div className="col-6 my-5 pe-5">
          <h2
            style={{ backgroundColor: "#272727", color: "#61892F" }}
            className="p-2 border border-3 rounded ps-4"
          >
            About Me
          </h2>
          <p style={{ color: "#FFFFFF" }} className="my-2 px-2">
            My name is Sandeep Bisht, Software Engineer by profession and very
            enthusiastic about Desi HIP HOP. Specially about the Desi Rap. Hip
            Hop is medium where one can freely express ourselve and that's the
            quality which made me clinched to it.
          </p>
          <h4
            className="p-2 border border-3 rounded ps-4 mt-5"
            style={{ backgroundColor: "#272727", color: "#61892F" }}
          >
            My Aim
          </h4>
          <p style={{ color: "#FFFFFF" }} className="my-2 px-2">
            I strongly believe that we can take DHH to the next level and it
            deserves to be taken to the next level. Our India has much more
            talent that can take over world they just need a platform, so its my
            attempt to provide them with one.
          </p>
        </div>
      </div>
      <div className="row py-1">
        <section className="mb-4 text-center">
          <a
            className="btn btn-outline-light m-1"
            href="https://www.facebook.com/sandeep.bisht.9212301/"
            target="_blank"
            role="button"
            rel="noreferrer noopener"
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
      </div>
    </div>
  );
};

export default About;
