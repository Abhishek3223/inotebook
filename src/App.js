import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Login from "./components/login";
import Signup from "./components/signup";
import Alert from "./components/alert";
function App() {

  const [alert, setAlert] = useState(null);

  const ShowAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (

    <div className="App">

      <NoteState>
        <Router>
          <div className="app-cont">
            <div className="display-navbar">

              <Navbar ShowAlerts={ShowAlert} />

              <Alert alert={alert} />
            </div>
            <div className="display-area container">
              <Routes>

                <Route exact path='/aboutus' element={<About ShowAlerts={ShowAlert} />} />
                <Route exact path='/login' element={<Login ShowAlerts={ShowAlert} />} />
                <Route exact path='/signup' element={<Signup ShowAlerts={ShowAlert} />} />
                <Route exact path='/' element={<Home ShowAlerts={ShowAlert} />} />

              </Routes>

            </div>
          </div>
        </Router>
      </NoteState>
    </div >

  );
}


export default App;


