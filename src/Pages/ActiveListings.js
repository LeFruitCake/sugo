import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation} from 'react-router-dom';
// import { db} from '../config/firebase';
import '../CSS/ActiveListings.css'
import ChipComponent from '../Components/Chip';
import { useEffect, useState } from 'react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PostRequest from '../Components/PostRequest';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const ActiveListings = (props) => { 
    const [posts,setPosts] = useState([])
    // const [ongoingPosts,setOngoingPosts] = useState([])
    const [posting,setPosting] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        const data = props.posts.filter((post)=>post.userID === localStorage.getItem('uid'))
        // const ongoingdata = props.posts.filter((post)=>post.userID === localStorage.getItem('uid') && post.status === 'ongoing')
        if(data.length > 0){
            setPosts(data)
        }
        // if(ongoingdata.length > 0){
        //     setOngoingPosts(ongoingdata)
        // }
    },[props.reload,props.posts])
    return (
        <>  
            {posts.length > 0 && posts ?
                <div id='ActiveListings-app-container'>
                    <div id='ActiveListings-left'>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div id="ActiveListings-mappedListings-container">
                                
                                    <>
                                        <Typography variant='subtitle1' fontWeight='bold' color='silver'>Active</Typography>
                                        {
                                            posts.filter((post)=>post.status==='open').map((post)=>(
                                                <NavLink key={post.id} to={post.id} >
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
                                        <Divider/>
                                    </>
                                    <>
                                        <Typography variant='subtitle1' fontWeight='bold' color='silver'>Ongoing</Typography>
                                        {
                                            posts.filter((post)=>post.status==='ongoing').map((post)=>(
                                                <NavLink key={post.id} to={post.id} >
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
                            </div>
                        </div>
                    </div>
                    <div id='ActiveListings-right'>
                        {location.pathname === '/listings'?
                            <Box sx={{display:'flex',height:'88dvh',justifyContent:'center',alignItems:'center',flexDirection:'column',color:'silver'}}>
                                <PanToolAltIcon sx={{fontSize:'80px'}} />
                                <Box sx={{display:'flex'}}>
                                    <ArrowLeftIcon /><Typography>Click one of your listing to display here.</Typography>
                                </Box>
                            </Box>:
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
