import {  FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-10 bg-base-200">
      <footer className="footer  text-base-content container mx-auto">
        <nav>
          <h6 className="footer-title text-lg text-emerald-600 font-bold">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title text-lg text-emerald-600">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-lg text-emerald-600">Social</h6>
          <div className="grid grid-flow-col gap-4 place-items-center">
            <Link to="/" className="text-2xl">
              <FaFacebookF />
            </Link>
            <Link to="/" className="text-2xl">
              <FaYoutube />
            </Link>
            <Link to="/" className="text-2xl">
              <FaTwitter/>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Enter Email "
              className="input input-bordered border-r-0 rounded-e-none "
            />
            <button className="btn bg-emerald-500 text-white  border-r-0 rounded-s-none ">
              Send
            </button>
          </div>
        </nav>
      </footer>

      <p className="text-sm text-center mt-8">
        &copy; 2024 Your Company. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
