import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "./Header";

import "../main.css";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    await axios({
      method: "put",
      url: `http://localhost:8000/api/users/${id}/edit`,
      data: { name, email, age },
    })
      .then((response) => {
        console.log(response);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(user.name);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setAge(user?.age);
  }, [user]);

  return (
    <div className="edituser">
      <h1>Edit user - {user.name}</h1>
      <input
        placeholder="Email"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button className="editSubmit" onClick={updateUser}>
        Submit
      </button>
    </div>
  );
};

export default EditUser;
