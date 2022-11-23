import React from "react";
import { FaHeart } from "react-icons/fa";
import "./footer.scss";
import Logo from "../../img/logoFooter.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="">
        <Link to="/">
          <img className="w-14" src={Logo} alt="" />
        </Link>
      </div>
      <span>
        Made with <FaHeart color="red" /> and <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;
