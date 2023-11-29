import { Typography } from '@mui/material';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import { db} from '../config/firebase';
import '../CSS/ActiveListings.css'


const ActiveListings = () => {
    const [posts,setPosts] = useState([])
    const [fetchingData, setFetchingData] = useState(false)
    const fetchData = async ()=>{
        setFetchingData(true)
        try {
            const data = await getDocs(
              query(collection(db, "Posts"), orderBy("postDate", "desc"),where("userID","==",localStorage.getItem('uid')))
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
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div id='ActiveListings-app-container'>
            <div id='ActiveListings-left'>
                {!fetchingData?
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div id='ActiveListings-User-Info'>
                        <Typography variant='h4' >{`${localStorage.getItem('displayName')}'s Active Listings`}</Typography>
                    </div>
                    <div id="ActiveListings-mappedListings-container">
                        {posts.map((post)=>(
                            <NavLink key={post.id} to={post.id} >
                                <div  id='ActiveListings-mappedListings'>
                                    {post.title}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                :<>False</>}
            </div>
            <div id='ActiveListings-right'>
                <Outlet context={[posts]}/>
            </div>
        </div>
    );
};



export default ActiveListings;
