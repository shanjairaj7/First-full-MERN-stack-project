import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "../main.css";

const Header = (props) => {
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div className="header">
      <div className="navbar">
        <h1>TestProject</h1>
        <Link to="/" className="link">
          🏠 Home
        </Link>
        <Link to="/adduser" className="link">
          ➕ Add User
        </Link>
      </div>
      <div className="main">
        <h1>Users</h1>

        <div className="users">
          {data?.users.map((user) => (
            <div
              className="user"
              onClick={() => history.push(`/user/${user._id}`)}
              key={user.name}
            >
              <h1>{user.name}</h1>
              <h3>Age: {user.age}</h3>
              <h3>Email: {user.email}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
