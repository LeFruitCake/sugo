import { useState } from "react";
// import { signInWithPopup } from "firebase/auth";
import { Auth } from "./Components/auth";
import "./App.css"
import Posts from "./Components/posts";
function App() {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem('logStatus')));
  return (
    <>
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
            <Posts logInfo={setLogged} />
          </div>
        </>}
      </div>
    </>
  );
}


export default App;
