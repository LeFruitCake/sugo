import { Box, Button, Modal, Skeleton, Stack, Typography } from '@mui/material';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation} from 'react-router-dom';
// import { db} from '../config/firebase';
import '../CSS/ActiveListings.css'
import ChipComponent from '../Components/Chip';
import { useEffect, useState } from 'react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PostRequest from '../Components/PostRequest';


const ActiveListings = (props) => { 
    const [activePosts,setActivePosts] = useState([])
    const [ongoingPosts,setOngoingPosts] = useState([])
    const [posting,setPosting] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        const data = props.posts.filter((post)=>post.userID === localStorage.getItem('uid') && post.status === 'open')
        const ongoingdata = props.posts.filter((post)=>post.userID === localStorage.getItem('uid') && post.status === 'ongoing')
        if(data.length > 0){
            setActivePosts(data)
            console.log(data)
        }
        if(ongoingdata.length > 0){
            setOngoingPosts(ongoingdata)
        }
        console.log("check")
    },[props.posts])
    return (
        <>  
            {console.log(ongoingPosts.length)}
            {activePosts.length > 0 || ongoingPosts.length > 0 ?
                <div id='ActiveListings-app-container'>
                    <div id='ActiveListings-left'>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div id="ActiveListings-mappedListings-container">
                                {
                                    activePosts.length>0?
                                        <>
                                            <Typography variant='subtitle1' fontWeight='bold' color='silver'>Active Listings</Typography>
                                                {
                                                    activePosts.map((post)=>(
                                                        <NavLink key={activePosts.id} to={post.id} >
                                                            <div  id='ActiveListings-mappedListings'>
                                                                <Stack direction='column' gap={1}>
                                                                    <Typography variant='subtitle1'>{post.title}</Typography>
                                                                    <Stack direction="row" spacing={1}>
                                                                        <ChipComponent category={post.category} ></ChipComponent>
                                                                    </Stack>
                                                                </Stack>
                                                            </div>
                                                        </NavLink>
                                                    ))
                                                }

                                        </>
                                    
                                    :
                                       <></>
                                }
                                {
                                    ongoingPosts?
                                    <>
                                            <Typography variant='subtitle1' fontWeight='bold' color='silver'>Ongoing</Typography>
                                                {
                                                    ongoingPosts.map((post)=>(
                                                        <NavLink key={activePosts.id} to={post.id} >
                                                            <div  id='ActiveListings-mappedListings'>
                                                                <Stack direction='column' gap={1}>
                                                                    <Typography variant='subtitle1'>{post.title}</Typography>
                                                                    <Stack direction="row" spacing={1}>
                                                                        <ChipComponent category={post.category} ></ChipComponent>
                                                                    </Stack>
                                                                </Stack>
                                                            </div>
                                                        </NavLink>
                                                    ))
                                                }

                                        </>
                                    
                                    :
                                        <div style={{display:'flex',flexDirection:'column', gap:'5px', justifyContent:'center', alignItems:'center', width:'100%'}}>
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
                        {location.pathname === '/listings'?
                            <>
                                Meh
                            </>:
                            <>
                                <Outlet context={[props.posts, props.comments,props.reload,props.setReload,props.getComments]}/>
                            </>
                        }
                    </div>
                </div>
                :
                <>
                    <Box sx={{border:'solid 1px black',height:'90dvh',display:'flex', justifyContent:'center', color:'silver',flexDirection:'column',alignItems:'center',gap:'50px'}}>
                            <Box sx={{display:'flex', alignItems:'center'}}>
                                <PlaylistRemoveIcon sx={{fontSize:'80px'}} />
                                <Typography variant='caption1' fontWeight='bold' fontSize={30} color='silver'>You currently have no listing.</Typography>
                            </Box>
                            <Typography variant='caption2' fontSize={20}>It looks like you have yet made a listing.</Typography>
                            <Button onClick={()=>setPosting(!posting)} variant='contained'>Create one</Button>
                            <div style={{width:'100%'}}>
                                {posting?<Modal open={posting} onClose={()=>setPosting(!posting)}>
                                    <PostRequest setPosting={setPosting} reload={props.reload} setReload={props.setReload} />
                                </Modal>:<></>}
                            </div>
                    </Box>    
                </>
            }
        </>
    );
};



export default ActiveListings;
