import { Box, Button, Divider, Grid, Modal, Stack, Typography } from '@mui/material';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
// import { db} from '../config/firebase';
import '../CSS/ActiveListings.css'
import ChipComponent from '../Components/Chip';
import { useEffect, useState } from 'react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PostRequest from '../Components/PostRequest';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import TripleDotOption from '../Components/tripledot';
import ListingNotFound from './ListingNotFound';

const ActiveListings = (props) => { 
    const [posts,setPosts] = useState([])
    const [posting,setPosting] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [validPage,setValidPage] = useState(true)
    useEffect(()=>{
        const data = props.posts.filter((post)=>post.userID === localStorage.getItem('uid'))
        const checkValid = props.posts.filter((post)=>post.id === location.pathname.split('/').pop())
        console.log(checkValid.length)
        console.log(location.pathname)
        if(location.pathname === '/listings' || checkValid.length > 0){
            setValidPage(true)
            if(data.length > 0){
                setPosts(data)
            }
        }else{
            setValidPage(false)
        }
        navigate(location.pathname)
    },[props.reload,props.posts,location.pathname,navigate])
    return (
        <>  
            {validPage?
                posts?
                <Grid container padding={1.2}>
                {posts.filter((post)=>post.status === 'open').length > 0 || posts.filter((post)=>post.status === 'ongoing').length > 0 ?
                    <Grid container>
                        <Grid item md={4} xs={12} >
                            <div id="ActiveListings-mappedListings-container">
                                {posts.filter((post)=>post.status==='open').length >0?
                                    <>
                                        <Typography variant='subtitle1' fontWeight='bold' color='silver'>Active</Typography>
                                        {posts.filter((post)=>post.status==='open').map((post)=>(
                                            <NavLink key={post.id} to={post.id}>
                                                <div  id='ActiveListings-mappedListings'>
                                                    <Stack direction='column' gap={1}>
                                                        <Typography variant='subtitle1'>{post.title}</Typography>
                                                        <Stack direction="row" spacing={1}>
                                                            <ChipComponent category={post.category} ></ChipComponent>
                                                        </Stack>
                                                    </Stack>
                                                    <TripleDotOption action="Post" postID={post.id} reload={props.reload} setReload={props.setReload} />
                                                </div>
                                            </NavLink>
                                        ))}
                                    </>
                                    :<></>
                                }
                                <Divider/>
                                {posts.filter((post)=>post.status==='ongoing').length > 0?
                                    <>
                                        <Typography variant='subtitle1' fontWeight='bold' color='silver'>Ongoing</Typography>
                                        {posts.filter((post)=>post.status==='ongoing').map((post)=>(
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
                                        ))}
                                    </>
                                    :<></>
                                }
                            </div>
                        </Grid>
                        <Grid sx={{marginTop:{xs:'50px',md:'10px'}}} item md={8} xs={12}>
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
                        </Grid>
                    </Grid>
                    :
                    <Grid item md={12}>
                        <Box sx={{height:'90dvh',display:'flex', justifyContent:'center', color:'silver',flexDirection:'column',alignItems:'center',gap:'50px'}}>
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
                    </Grid>  
                }
            </Grid>:
                <>Loading</>
                    :
                <ListingNotFound/>
            }
            
        </>
    );
};



export default ActiveListings;
