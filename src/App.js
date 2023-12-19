import { useState, useEffect } from "react";
import "./App.css"
import { BrowserRouter, Route, Routes} from "react-router-dom";

//components
import { Auth } from "./Components/auth";
import { db } from "./config/firebase";

//firebase
import { getDocs, query, collection, orderBy } from "firebase/firestore";

//pages
import Dashboard from "./Pages/Dashboard";
import ActiveListings from "./Pages/ActiveListings";
import Listing from "./Pages/Listing";
import Biddings from "./Pages/Biddings";
function App() {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem('logStatus')));
  const [posts,setPosts] = useState([]);
  const [comments,setComments] = useState([]);
  const [reload,setReload] = useState(false);
  const [fetchingData,setFetchingData] = useState(false)
  const fetchData = async ()=>{
    setFetchingData(true)
    try {
        const data = await getDocs(
          query(collection(db, "Posts"), orderBy("postDate", "desc"))
        );
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(filteredData);
        setFetchingData(false)
      } catch (err) {
        console.error(err);
      }
  }
  const fetchComments = async ()=>{
      try{
          const comments = await getDocs(
              query(collection(db,"Comments"),orderBy("postDate","asc"))
          );
          const filteredComments = comments.docs.map((comment)=>({
              ...comment.data(),
              id:comment.id,
          }))
          setComments(filteredComments);
      }catch(err){
          console.error(err)
      }
  }
  useEffect(()=>{
      fetchData()
      fetchComments()
      console.log(logged)
  },[reload])
  return (
    <div id="app-container">
          <BrowserRouter>
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
              <Routes>
                <Route path="/" element={<Dashboard logInfo={setLogged} setFetchingData={setFetchingData} fetchingData={fetchingData} reload={reload} setReload={setReload} fetchComments={fetchComments} comments={comments} posts={posts} />} >
                  <Route path="listings" element={<ActiveListings getComments={fetchComments} posts={posts} comments={comments} reload={reload} setReload={setReload} />}>
                    <Route path=":id" element={<Listing/>} />
                  </Route>
                  <Route path="biddings" element={<Biddings posts={posts}/>} />
                  <Route path="history" element={<h1>history</h1>} />
                </Route>
              </Routes>
          </div>
        </>}
      </div>
          </BrowserRouter>
    </div>
  );
}


export default App;
