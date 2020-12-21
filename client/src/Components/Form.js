import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../main.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const history = useHistory();

  const signup = async (name, email, age) => {
    // Making axios post request
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/users/add",
        data: { name, email, age },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      history.push("/");

      return response;
    } catch (err) {
      alert("User already exists " + err.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length > 0 && email.length > 0 && age.length > 0) {
      const res = await signup(name, email, age);
    } else {
      alert("Enter valid information");
    }
  };

  return (
    <div className="form">
      <div className="navbar">
        <h1>TestProject</h1>
        <Link to="/" className="link">
          🏠 Home
        </Link>
        <Link to="/adduser" className="link">
          ➕ Add User
        </Link>
      </div>
      <form>
        <div>
          <h1>Add a user</h1>
          <p>
            Make sure that all the entries are valid, and once you add the user
            you could be redirected to the home page.
          </p>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
