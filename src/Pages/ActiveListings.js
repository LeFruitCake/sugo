import { Skeleton, Stack, Typography } from '@mui/material';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
import { NavLink, Outlet} from 'react-router-dom';
// import { db} from '../config/firebase';
import '../CSS/ActiveListings.css'
import ChipComponent from '../Components/Chip';
import { useEffect, useState } from 'react';


const ActiveListings = (props) => { 
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const data = props.posts.filter((post)=>post.userID === localStorage.getItem('uid'))
        setPosts(data)
    },[props.posts])
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
                            posts?
                            posts.map((post)=>(
                                <NavLink key={post.id} to={post.id} >
                                    <div  id='ActiveListings-mappedListings'>
                                        {post.title}
                                        <Stack direction="row" spacing={1}>
                                            <ChipComponent category={post.category} ></ChipComponent>
                                        </Stack>
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
                <Outlet context={[props.posts, props.comments,props.reload,props.setReload,props.getComments]}/>
            </div>
        </div>
    );
};



export default ActiveListings;
