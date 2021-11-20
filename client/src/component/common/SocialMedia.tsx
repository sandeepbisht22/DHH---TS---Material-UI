import React, { Fragment } from "react";

const SocialMedia = ({ socialaccount, i }) => {
  const socialMediaMap = {
    instagram: "fab fa-instagram-square fa-5x",
    facebook: "fab fa-facebook-square fa-5x",
    youtube: "fab fa-youtube-square fa-5x",
    twitter: "fab fa-twitter-square fa-5x",
    spotify: "fab fa-spotify fa-5x",
    apple: "fab fa-apple fa-5x",
  }; //will move this thing in database later
  const entries = Object.entries(socialaccount);
  const secondColumnStart = socialMediaMap.length / 2;

  const keyValue = entries[0][0];
  let className = null;
  Object.entries(socialMediaMap).map(([key, value]) => {
    if (key === keyValue) {
      className = value;
    }
  });
  const clickLink = entries[0][1];

  return (
    <Fragment>
      {
        <a
          href={clickLink}
          className="col-md-1 p-2 text-center"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className={className} style={{ color: "#FFFFFF" }}></i>
        </a>
      }
    </Fragment>
  );
};

export default SocialMedia;
