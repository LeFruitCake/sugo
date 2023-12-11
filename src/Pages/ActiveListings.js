import { Chip, Skeleton, Typography } from '@mui/material';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
import { NavLink, Outlet} from 'react-router-dom';
// import { db} from '../config/firebase';
import '../CSS/ActiveListings.css'


const ActiveListings = (props) => {
    // const [posts,setPosts] = useState([])
    // const [fetchingData, setFetchingData] = useState(false)
    // const fetchData = async ()=>{
    //     setFetchingData(true)
    //     try {
    //         const data = await getDocs(
    //           query(collection(db, "Posts"), orderBy("postDate", "desc"),where("userID","==",localStorage.getItem('uid')))
    //         );
    //         const filteredData = data.docs.map((doc) => ({
    //           ...doc.data(),
    //           id: doc.id,
    //         }));
    //         setPosts(filteredData);
    //         setFetchingData(false)
    //       } catch (err) {
    //         console.error(err);
    //       }
    // }
    
    // useEffect(()=>{
    //     fetchData()
    // },[])   
    return (
        <div id='ActiveListings-app-container'>
            <div id='ActiveListings-left'>
                <div id='ActiveListings-User-Info'>
                    <Typography variant='h4' >Your Active Listings</Typography>
                </div>
                {/* {!fetchingData? */}
                <div style={{display:'flex',flexDirection:'column'}}>
                    
                    <div id="ActiveListings-mappedListings-container">
                        {
                            props.posts?
                            props.posts.filter((post)=>post.userID === localStorage.getItem('uid')).map((post)=>(
                                <NavLink key={post.id} to={post.id} >
                                    <div  id='ActiveListings-mappedListings'>
                                        {post.title}
                                        <Chip size='small' sx={{width:'fit-content',marginTop:'5px',backgroundColor:'white'}} variant='outlined' color='primary' label={post.category} ></Chip>
                                    </div>
                                </NavLink>
                            ))
                            
                            :<div style={{display:'flex',flexDirection:'column', gap:'5px', justifyContent:'center', alignItems:'center', width:'100%'}}>
                            <Skeleton variant='rounded' width={500} height={80} />
                            <Skeleton variant='rounded' width={500} height={80} />
                            <Skeleton variant='rounded' width={500} height={80} />
                            <Skeleton variant='rounded' width={500} height={80} />
                            <Skeleton variant='rounded' width={500} height={80} />
                            <Skeleton variant='rounded' width={500} height={80} />
                            <Skeleton variant='rounded' width={500} height={80} />
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div id='ActiveListings-right'>
                <Outlet context={[props.posts, props.comments]}/>
            </div>
        </div>
    );
};



export default ActiveListings;
