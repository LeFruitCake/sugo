import { useState } from "react";
// import { signInWithPopup } from "firebase/auth";
import { Auth } from "./Components/auth";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ActiveListings from "./Pages/ActiveListings";
import Listing from "./Pages/Listing";
function App() {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem('logStatus')));
  return (
    <div id="app-container">
      <div style={{backgroundColor: logged? "white" : "#164C45" }} id="app-container">
        {!logged?
        <>
          <div id="left-side">
            <div id="logo-text">
              <div>
                <h1 id="sugo-text">SUGO</h1>
                <h2 id="description">Cebu City's first request based online platform for Technical-Vocational activities.</h2>
              </div>
            </div>
            <div></div>
          </div>
          <div id="login-container-app">
            <div></div>
            <div id="rightside-middle">
              <Auth logInfo={setLogged}/>
            </div>
            <div></div>
          </div>
        </>:
        <>
          <div id="dashboard">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard logInfo={setLogged} />} >
                  <Route path="listings" element={<ActiveListings/>}>
                    <Route path=":id" element={<Listing/>} />
                  </Route>
                  <Route path="biddings" element={<h1>biddings</h1>} />
                  <Route path="history" element={<h1>history</h1>} />
                </Route>
              </Routes>
            </BrowserRouter>
            {/* <Posts logInfo={setLogged} /> */}
          </div>
        </>}
      </div>
    </div>
  );
}


export default App;
