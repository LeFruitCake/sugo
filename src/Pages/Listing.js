import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import '../CSS/Listing.css'

//component
import BackgroundLetterAvatars from '../Components/Avatar';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import Comment from '../Components/Comments';



const Listing = () => {
    const location = useLocation()
    const navigate = useNavigate()
    let param = useParams()
    const [listings] = useOutletContext();
    const [displayListing,setDisplayListing] = useState(null)
    const [loading,setLoading] = useState(true)
    const [comments,setComments] = useState([])
    const [showComments,setShowComments] = useState(true)
    const [reload,setReload] = useState(true)
    const [loadingComments,setLoadingComments] = useState(false)
    const fetchData = useCallback(async ()=>{
        try{
            const data = await listings.filter((listing)=>listing.id === param.id)
            setDisplayListing(data)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    },[param.id,listings])
    const fetchComments = useCallback(async ()=>{
        setLoadingComments(true)
        try{
            const comments = await getDocs(
                query(collection(db,"Comments"),orderBy("postDate","asc"),where("postID","==",param.id))
            );
            const filteredComments = comments.docs.map((comment)=>({
                ...comment.data(),
                id:comment.id,
            }))
            setComments(filteredComments);
            setLoadingComments(false)
        }catch(err){
            console.error(err)
        }
    },[param.id])
    useEffect(()=>{
        navigate(location.pathname)
        fetchData()
        fetchComments()
        console.log("gone here")
    },[listings,param.id,navigate,location.pathname,fetchComments,fetchData])
    return (
        <div id='Listing-container'>
            {loading && <p>Loading...</p>}
            {displayListing && displayListing.length > 0 && (
                <>
                    <div id='Listing'>
                        <div id='Listing-user-info'>
                            <BackgroundLetterAvatars size={65} name={displayListing[0].displayName} /> 
                            <div style={{display:'flex', flexDirection:'column',justifyContent:'center'}}>
                                <Typography variant='h6' >{displayListing[0].displayName}</Typography>
                                <Typography variant='body1' >{new Date(displayListing[0].postDate.seconds * 1000 + displayListing[0].postDate.nanoseconds / 1000000).toLocaleDateString()}</Typography>
                            </div>
                        </div>
                        <div id='Listing-post-description'>
                            <Typography variant='subtitle1' >{displayListing[0].description}</Typography>
                        </div>
                    </div>
                    <div id='Listing-Buttons'>
                        <nav id='Listing-navigation'>
                            <Button onClick={()=>{setShowComments(true)}} id='Listing-navigation-btn'><Typography sx={{fontSize:'15px'}} variant='button' color='primary' >Comments</Typography></Button>
                            <Button onClick={()=>setShowComments(false)} id='Listing-navigation-btn'><Typography sx={{fontSize:'15px'}} variant='button' color='primary' >Bids</Typography></Button>
                        </nav>
                    </div>
                    <div id='Listing-comments'>
                        {showComments?
                        <>
                            {loadingComments?
                            <div style={{marginTop:'5px'}}>
                                <Stack gap={1}>
                                    <Skeleton variant='rounded' height={80} width={800} />
                                    <Skeleton variant='rounded' height={80} width={800} />
                                    <Skeleton variant='rounded' height={80} width={800} />
                                    <Skeleton variant='rounded' height={80} width={800} />
                                    <Skeleton variant='rounded' height={80} width={800} />
                                </Stack>
                            </div>
                            :
                            <>
                                {comments.map((comment,index)=>(
                                    <Comment key={index} getComments={fetchComments} filteredComment = {comment} setReload={setReload} reload={reload} />
                                ))}
                            </>}
                        </>
                            :
                        <>
                            <h1>No Bids as of the moment.</h1>
                        </>}
                    </div>
                </>
            )}
        </div>
    );
};



export default Listing;
