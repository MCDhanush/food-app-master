import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credential.email,
        password: credential.password,
      })
    );
    const response = await fetch("https://bd-f.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credantials");
    } else {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", json.authToken);
      alert("login succesfully");
      navigate("/");
    }
  };

  //   focus on onchange this is used for onchage value
  const onChange = (event) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="container lbad-4">
        <form onSubmit={handleSubmit}>
          <div className="header-ver"> LOGIN </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={credential.email}
              name="email"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={credential.password}
              name="password"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            For New User
          </Link>
          <Link to="/" className="m-0 btn btn-secondary">
            back
          </Link>
        </form>
      </div>
    </>
  );
}
