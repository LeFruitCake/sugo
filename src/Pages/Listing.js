import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import '../CSS/Listing.css'

//component
import BackgroundLetterAvatars from '../Components/Avatar';
import { Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import Comment from '../Components/Comments';
import Bids from '../Components/Bids';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';


const Listing = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    let param = useParams()
    const [listings,comments,reload,setReload,getComments] = useOutletContext();
    const [displayListing,setDisplayListing] = useState(null)
    const [loading,setLoading] = useState(true)
    const [filteredComments,setFilteredComments] = useState([])
    const [showComments,setShowComments] = useState(true)
    const [loadingComments,setLoadingComments] = useState(false)
    const [loadingBids, setLoadingBids] = useState(false)
    const [bids,setBids] = useState([])
    
    
    
    useEffect(()=>{
        setShowComments(true)
        const fetchData = async ()=>{
            try{
                const data = await listings.filter((listing)=>listing.id === param.id)
                setDisplayListing(data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        const fetchBids = async ()=>{
            setBids([])
            setLoadingBids(true)
            try{
                const id = await listings.filter((listing)=>listing.id===param.id)
                if(id.length>0){
                    const data = await getDocs(
                        query(collection(db,"Bids"),where("postID","==",id[0].id))
                    )
                    console.log(data.size)
                    if(data.size > 0){
                        const filteredData = data.docs.map((doc) => ({
                            ...doc.data(),
                            id:doc.id,
                        }));
                        const sortedData = filteredData.sort((a, b) => a.amount - b.amount);
    
                        console.log(sortedData);
                        setBids(sortedData);
                    } 
                }
            }catch(error){
                console.log(error)
            }finally{
                setLoadingBids(false)
            }
        }
        const fetchComments = async ()=>{
            setLoadingComments(true)
            try{
                const data = await comments.filter((comment)=>comment.postID === param.id)
                setFilteredComments(data)
            }catch(error){
                console.log(error)
            }finally{
                setLoadingComments(false)
            }
        }
        navigate(location.pathname)
        fetchData()
        fetchComments()
        fetchBids()
    },[reload,comments,listings,location.pathname,navigate,param.id])
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
                            <Button onClick={()=>{setShowComments(true)}} variant='contained' color='primary' id='Listing-navigation-btn'>Comments</Button>
                            <Button onClick={()=>setShowComments(false)} variant='contained' color='primary' id='Listing-navigation-btn'>Bids</Button>
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
                                {filteredComments.length > 0?
                                    <>
                                    {filteredComments.map((comment,index)=>(
                                        <Comment getComments={getComments} key={index} filteredComment = {comment} setReload={setReload} reload={reload} />
                                    ))}</>:
                                    <>
                                        <div style={{height:'95%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <Stack direction='column' spacing={2} alignItems='center'>
                                                <NoAccountsIcon style={{fontSize:'60px',color:'silver'}} />
                                                <Typography variant='caption1' style={{fontSize:'25px',color:'silver'}} >This post has yet garnered a comment</Typography>
                                            </Stack>
                                        </div> 
                                    </>
                                }
                            </>
                            }
                        </>
                            :
                        <>
                            {loadingBids?
                                <>
                                    <div style={{marginTop:'5px'}}>
                                        <Stack gap={1}>
                                            <Skeleton variant='rounded' height={80} width={800} />
                                            <Skeleton variant='rounded' height={80} width={800} />
                                            <Skeleton variant='rounded' height={80} width={800} />
                                            <Skeleton variant='rounded' height={80} width={800} />
                                            <Skeleton variant='rounded' height={80} width={800} />
                                        </Stack>
                                    </div>
                                </>:
                                <>
                                    {bids.length > 0?
                                    <div style={{display:'flex',flexDirection:'column',gap:'10px',width:'80%',margin:'0 auto',marginTop:'15px'}}>
                                    <Stack gap={3}>
                                        {bids.map((bid,index)=>(
                                            <>
                                            <Bids postID={bid.postID} reload={props.reload} setReload={props.setReload} bid={bid}/>
                                            <Divider/>
                                            </>
                                        ))}
                                    </Stack>
                                </div>:<div style={{height:'95%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <Stack direction='column' spacing={2} alignItems='center'>
                                                <DoNotStepIcon style={{fontSize:'60px',color:'silver'}} />
                                                <Typography variant='caption1' style={{fontSize:'25px',color:'silver'}} >Bids came up empty.</Typography>
                                            </Stack>
                                </div>    
                                }
                                </>
                            }
                        </>}
                    </div>
                </>
            )}
        </div>
    );
};



export default Listing;
