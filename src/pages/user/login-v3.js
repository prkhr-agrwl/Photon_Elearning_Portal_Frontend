import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { PageSettings } from "./../../config/page-settings.js";

const Login = props => {
  const context = useContext(PageSettings);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async formData => {
    const res = await Axios.post(
      "https://frozen-temple-25034.herokuapp.com/admin/login",
      formData
    );
    console.log(res.data);
    window.localStorage.setItem("loginToken", res.data.accessToken);
  };

  useEffect(() => {
    context.handleSetPageSidebar(false);
    context.handleSetPageHeader(false);
    context.handleSetBodyWhiteBg(true);
    return () => {
      context.handleSetPageSidebar(true);
      context.handleSetPageHeader(true);
      context.handleSetBodyWhiteBg(false);
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    loginAdmin({ email: email, password: password });
    props.history.push("/knowledgeDomains");
  };

  return (
    <div className="login login-with-news-feed">
      <div className="news-feed">
        <div
          className="news-image"
          style={{
            backgroundImage: "url(/assets/img/login-bg/login-bg-11.jpg)"
          }}
        ></div>
        <div className="news-caption">
          <h4 className="caption-title">
            <b>Photom</b> Ecademy
          </h4>
          <p>Online Education Portal</p>
        </div>
      </div>
      <div className="right-content">
        <div className="login-header">
          <div className="brand">
            <span className="logo"></span> <b>Photon</b> Ecademy
          </div>
          <div className="icon">
            <i className="fa fa-sign-in"></i>
          </div>
        </div>
        <div className="login-content">
          <form className="margin-bottom-0" onSubmit={e => handleSubmit(e)}>
            <div className="form-group m-b-15">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group m-b-15">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="checkbox checkbox-css m-b-30">
              <input type="checkbox" id="remember_me_checkbox" value="" />
              <label htmlFor="remember_me_checkbox">Remember Me</label>
            </div> */}
            <div className="login-buttons">
              <button
                type="submit"
                className="btn btn-success btn-block btn-lg"
              >
                Sign me in
              </button>
            </div>
            <div className="m-t-20 m-b-40 p-b-40 text-inverse">
              Not a member yet? Click{" "}
              <Link to="/user/register-v3" className="text-success">
                here
              </Link>{" "}
              to register.
            </div>
            <hr />
            <p className="text-center text-grey-darker">
              &copy; Color Admin All Right Reserved 2019
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
