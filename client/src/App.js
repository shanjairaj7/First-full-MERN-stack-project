import React, { useEffect, useState } from "react";
import axios from "axios";

import Link, { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header";
import User from "./Components/User";
import Form from "./Components/Form";
import EditUser from "./Components/EditUser";

const App = () => {
  return (
    <Router>
      <Route path="/" exact>
        <Header />
      </Route>
      <Route path="/user/:id/edit">
        <EditUser />
      </Route>
      <Route path="/user/:id" exact>
        <User />
      </Route>
      <Route path="/adduser">
        <Form />
      </Route>
    </Router>
  );
};

export default App;
