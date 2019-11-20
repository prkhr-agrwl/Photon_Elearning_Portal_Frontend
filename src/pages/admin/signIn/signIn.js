import React, { useState } from "react";
import Axios from "axios";

const SignIn = () => {
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

  const onSubmit = e => {
    e.preventDefault();
    loginAdmin({ email: email, password: password });
  };

  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        email
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        ></input>
        <br />
        password
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
