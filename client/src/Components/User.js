import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  });

  const deleteUser = async (e) => {
    e.preventDefault();

    await axios({
      method: "delete",
      url: `http://localhost:8000/api/users/${id}/delete`,
    })
      .then((response) => {
        console.log(response);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="userContainer">
      <h1>User Info</h1>
      <div className="userComponent">
        {user && (
          <div>
            <h1>{user.name}</h1>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
      <div className="buttons">
        <a
          className="editUser"
          href={`http://localhost:3000/user/${user._id}/edit`}
        >
          Edit
        </a>
        <a className="deleteUser" onClick={deleteUser}>
          Delete
        </a>
      </div>
    </div>
  );
};

export default User;
