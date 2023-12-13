import "../CSS/posts.css"
import * as React from 'react';

//Firebase
import { auth, db} from "../config/firebase";
import { collection, getDocs, addDoc,updateDoc, serverTimestamp, query, orderBy, doc, where, limit } from "firebase/firestore";//updateDoc, deleteDoc 
import { useState } from "react";

//Component
import BackgroundLetterAvatars from "./Avatar";
import TripleDotOption from "./tripledot";
import PostRequest from "./PostRequest";
import Comment from "./Comments";

//MUI
import {  Button, CircularProgress, TextField, Typography, Accordion, AccordionDetails, Chip, Skeleton, AvatarGroup, Modal, InputAdornment, Divider, AccordionSummary} from "@mui/material";
import { styled } from '@mui/material/styles';
import FluorescentIcon from '@mui/icons-material/Fluorescent';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Stack } from "@mui/system";
import PhpIcon from '@mui/icons-material/Php';
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BidForm from "./BidForm";
import RadioIcon from '@mui/icons-material/Radio';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AirIcon from '@mui/icons-material/Air';
import BuildIcon from '@mui/icons-material/Build';
import SearchIcon from '@mui/icons-material/Search';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { useEffect } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function Posts(props){
    // const [posts,setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [filteredCategory, setFilteredCategory] = useState("All")
    const [posting,setPosting] = useState(false)
    const filter = async (label)=>{
        props.setFetchingData(true)
        setFilteredCategory(label)
        try {
            if(label === "All"){
                props.setReload(!props.reload);
            }else{
                const data = await getDocs(
                    query(collection(db, "Posts"), orderBy("postDate", "desc"),where("category","==",label))
                )
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setFilteredPosts(filteredData)
                props.setFetchingData(false)
            }
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <>
            <div id="app-container-posts">
                <div id="feed-area">
                    <div id="feed-area-left">
                        <div id="fal-sub">
                            <div id="fal-top">   
                                <div id="fal-top-content">
                                    <h1>SUGO</h1>
                                    <h4>your hustle partner</h4>
                                </div>
                            </div>
                            <div id="fal-mid">
                                <Stack direction="column" spacing={0}>
                                    <Button onClick={()=>filter("All")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>All</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Automotive")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Automotive</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Computer System Servicing")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Computer System Servicing</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Cosmetology")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Cosmetology</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Tailoring")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Tailoring</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Electrical Systems")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Electrical Systems</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Electronics")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Electronics</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Food and Beverage Servicing")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Food and Beverage Servicing</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Hair Dressing")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Hair Dressing</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Plumbing")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Plumbing</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Welding")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Welding</Button>
                                    <Divider/>
                                    <Button onClick={()=>filter("Woodworking")} sx={{width:'100%',justifyContent:'flex-start',textTransform:'none'}}>Woodworking</Button>
                                    <Divider/>
                                </Stack>
                            </div>
                            <div id="fal-bot">
                                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                    <CopyrightIcon fontSize="large" /> <Typography variant="subtitle2" >Industry Elective 1 Final Project</Typography>
                                </div>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <Typography variant="caption">Jandel Macabecha</Typography>
                                    <Typography variant="caption">Ross Mikhail Vestil</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="feed-area-middle">
                        <div id="feed-area-post-btns">
                            <div id="filter-container">
                                
                                <TextField type="search" variant="standard" placeholder="Search" sx={{width:'80%',backgroundColor:'white', border:'none', padding:'10px', borderRadius:'20px'}} InputProps={{
                                    startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                                    disableUnderline:true,
                                }}/>
                                <Button sx={{display:'flex',flexDirection:'column',alignItems:'center'}} onClick={()=>setPosting(!posting)}><BorderColorIcon fontSize="medium" sx={{color:'black'}}/><Typography variant="caption" sx={{color:'black'}} >Post</Typography></Button>
                                </div>
                                <div style={{width:'100%'}}>
                                    {posting?<Modal open={posting} onClose={()=>setPosting(!posting)}>
                                        <PostRequest setPosting={setPosting} reload={props.reload} setReload={props.setReload} />
                                    </Modal>:<></>}
                                </div>
                            </div>

                        {props.fetchingData?
                        <>
                        <Stack spacing={1}>
                            <Skeleton animation="wave" variant="rounded" width={'100%'} height={100} />
                            <Skeleton animation="wave" variant="rounded" width={'100%'} height={100} />
                            <Skeleton animation="wave" variant="rounded" width={'100%'} height={100} />
                            <Skeleton animation="wave" variant="rounded" width={'100%'} height={100} />
                            <Skeleton animation="wave" variant="rounded" width={'100%'} height={100} />
                         </Stack>
                        </>:
                        <div id="mapped-posts">
                            {
                                filteredCategory !== "All"?
                                <>
                                    {filteredPosts.length === 0?
                                        <h1>No listing</h1>
                                        :
                                        filteredPosts.map((post,index)=>{
                                            const mappedComments = props.comments.filter((comment)=>comment.postID === post.id);
                                            return(
                                                <Post comment={mappedComments} key={index} post={post} reload={props.reload} setReload={props.setReload} date={new Date(post.postDate.seconds * 1000 + post.postDate.nanoseconds / 1000000).toLocaleDateString()} />
                                            )
                                        })
                                    }
                                </>
                                
                                :props.posts?
                                    props.posts.length > 0?
                                            props.posts.map((post,index)=>{
                                                const mappedComments = props.comments.filter((comment)=>comment.postID === post.id);
                                                return(
                                                    <Post fetchComments={props.fetchComments} comment={mappedComments} key={index} post={post} reload={props.reload} setReload={props.setReload} date={new Date(post.postDate.seconds * 1000 + post.postDate.nanoseconds / 1000000).toLocaleDateString()} />
                                                )
                                            }):
                                        <><h1 style={{alignSelf:'center'}}>No Available Listing.</h1></>
                                    :<>zero{console.log(props.posts)}</>
                            }
                        </div>}
                    </div>
                    
                </div>
            </div>
        </>
    )
}



const AccordionStyled = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius:'5px',
    height:'fit-content',
    // backgroundColor:"#E3C75F",
    // '&:not(:last-child)': {
    //   borderBottom: 0,
    // },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummaryCustomized = styled((props) => (
    <MuiAccordionSummary
    //   expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))
  (({ theme }) => ({
    // backgroundColor:'#164C45',
    // color:'white',
    display:'flex',
    alignItems:'center',
    borderRadius:'5px',
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
    
  }));
  
  const AccordionDetailsStyled = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

function Post(props){
    
    const [expanded, setExpanded] = React.useState(false);
    const [editingPost,setEditingPost] = useState(false);
    const [requestDescription, setRequestDescription] = useState("")
    const [loading,setLoading] = useState(false)
    const [bidding,setBidding] = useState(false)
    const [isBidderResult,setIsBidderResult] = useState(null)
    const [reloader,setReloader] = useState(false)
    const [bidAction, setBidAction] = useState(null)
    const [biddersCount,setBiddersCount] = useState(0)
    const [lowestBid,setLowestBid] = useState(0)
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }
    const [comment,setComment] = useState("")
    const postComment = async (post) =>{
        setLoading(true)
        await addDoc(collection(db,"Comments"),{
            postID:post.id,
            photoURL:auth.currentUser?.photoURL,
            displayName:auth.currentUser.displayName,
            comment:comment,
            postDate:serverTimestamp(),
            userID:auth?.currentUser?.uid,
        })
        .then(()=>{
            props.fetchComments()
            setComment("")
            setLoading(false)
            console.log("gone through")
        })
        .catch((error)=>{
            console.error(error)
            setLoading(false)
        })
    }

    const editPost = async (post,requestDescription,reload,setReload)=>{
        setLoading(true)
        try{
            await updateDoc(doc(db,"Posts",post.id),{
                description:requestDescription,
            }).then(()=>{
                setEditingPost(false)
                setLoading(false)
                setReload(!reload)
            })
        }catch(error){
            console.log(error)
            console.log(post.id)
            console.log(requestDescription)
            setLoading(false)
        }
    }
    
    const colorPicker = (label)=>{
        switch (label){
            case 'Electronics':
                return 'mediumblue';
            case 'Food and Beverage Servicing':
                return 'coral';
            case 'Cosmetology':
                return 'hotpink';
            case 'Welding':
                return 'sienna';
            case 'Tailoring':
                return 'rebeccapurple'
            case 'Computer System Servicing':
                return 'teal'
            case 'Woodworking':
                return 'peru'
            case 'Electrical Systems':
                return 'dodgerblue'
            case 'Plumbing':
                return 'forestgreen'
            case 'Automotive':
                return 'black'
            case 'Hair Dressing':
                return 'crimson'
            default:
                return 'grey';
        }
    }

    const iconPicker = (label)=>{
        switch (label){
            case 'Automotive':
                return <BuildIcon fontSize="small" style={{color:'white'}} />
            case 'Electronics':
                return <RadioIcon fontSize="small" style={{color:'white'}} />
            case 'Cosmetology':
                return <FaceRetouchingNaturalIcon fontSize="small" style={{color:'white'}}/>
            case 'Tailoring':
                return <ContentCutIcon fontSize="small" style={{color:'white'}}/>
            case 'Woodworking':
                return <CarpenterIcon fontSize="small" style={{color:'white'}}/>
            case 'Computer System Servicing':
                return <ImportantDevicesIcon fontSize="small" style={{color:'white'}}/>
            case 'Welding':
                return <LocalFireDepartmentIcon fontSize="small" style={{color:'white'}}/>
            case 'Food and Beverage Servicing':
                return <BrunchDiningIcon fontSize="small" style={{color:'white'}}/>
            case 'Electrical Systems':
                return <ElectricBoltIcon fontSize="small" style={{color:'white'}}/>
            case 'Plumbing':
                return <PlumbingIcon fontSize="small" style={{color:'white'}}/>
            case 'Hair Dressing':
                return <AirIcon fontSize="small" style={{color:'white'}}/>
            default:
                return <FluorescentIcon/>
        }
    }
    useEffect(() => {
        const checkBidder = async () => {
            const result = await isBidder(props.post.id);
            setIsBidderResult(result);
        };
        
        checkBidder();
        getBidCount();
        getLowestBid();
    }, [props.post.id,reloader]);

    const isBidder = async (postID) =>{
        const data = await getDocs(
            query(collection(db, "Bids"),where("postID","==",postID),where("userID","==",auth.currentUser.uid))
        )
        if(data.docs.length === 1){
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }));
            return filteredData[0];
        }
        return false;
    }

    const getBidCount = async ()=>{
        const data = await getDocs(
            query(collection(db, "Bids"),where("postID","==",props.post.id))
        )
        setBiddersCount(data.docs.length)
    }

    const getLowestBid = async ()=>{
        const data = await getDocs(
            query(collection(db, "Bids"), where("postID", "==", props.post.id), orderBy("amount", "asc"), limit(1))
        );
    
        if (data.docs.length === 1) {
            setLowestBid(data.docs[0].data().amount)
        }else{
            setLowestBid(null)
        }
    }
    
    return(
        <>
            <AccordionStyled expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummaryCustomized aria-controls="panel1d-content" id="panel1d-header">
                    <div style={{display:'flex',width:'100%'}}>
                        <div style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center', gap:'10px'}}>
                                <Typography fontSize={20} variant="h3" gutterBottom>
                                    Re: <span style={{fontWeight:'bold'}}>{props.post.title}</span>
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {props.post.category?<Chip icon={iconPicker(props.post.category)} label={props.post.category} variant="outlined" sx={{backgroundColor:colorPicker(props.post.category),color:'white',padding:'5px',borderColor:colorPicker(props.post.category)}} size="small" />:<Chip label="None" variant="outlined" size="small" />}
                                    {auth?.currentUser?.uid === props.post.userID?
                                    <Stack direction="row" spacing={1} sx={{alignSelf:'flex-start'}}>
                                    <Chip icon={<FluorescentIcon fontSize="small"/>} color="warning" label="Yours" variant="filled" size="small" />
                                    </Stack>:<>
                                    {isBidderResult?<Chip sx={{backgroundColor:'DarkGreen', color:'white'}} icon={<AttachMoneyIcon fontSize="small" style={{color:'white'}}/> }  label="Bidder" variant="outlined" size="small" />:<></>}
                                    </>}
                                </Stack>
                            </div>
                            <div style={{width:'25%'}}>
                                <div style={{display:'flex',flexDirection:'column',height:'fit-content',justifyItems:'flex-end', alignItems:'flex-end',margin:'0 auto',width:'100%'}} >
                                    {props.post.amount === 0?
                                        <Typography variant="caption" gutterBottom style={{color:'navy',fontWeight:'bold'}} fontSize={20}>Open Bid</Typography>:
                                        <Typography sx={{display:'flex'}} fontSize={30} variant="h3" gutterBottom>
                                            {parseInt(props.post.amount).toLocaleString()}
                                        <PhpIcon  fontSize="large"/>
                                        </Typography>
                                    }
                                    <div style={{display:'flex',gap:'10px'}}>
                                        <Typography sx={{display:'flex',alignItems:'center'}} variant="subtitle1" fontSize={12} style={{color:'gray'}}><AccountCircleIcon fontSize="small"/>Bidders: {biddersCount}</Typography>
                                        <Typography sx={{display:'flex',alignItems:'center'}} variant="subtitle1" fontSize={12} style={{color:'gray'}}><KeyboardDoubleArrowDownIcon fontSize="small"/>Lowest Bid: {lowestBid?parseInt(lowestBid).toLocaleString():<><span style={{color:'red'}}> &nbsp;No Bids</span></>}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSummaryCustomized>
                <AccordionDetailsStyled>
                <div style={{padding:'10px', backgroundColor:'white',marginTop:'5px'}}>
                    <div id="user-info-inputbox">
                        <div style={{display:'flex', alignItems:'center',gap:'10px',width:'100%'}}>
                            {props.post.photoURL?<img alt="userphoto" id="userPhoto" src={props.post.photoURL}/>:<BackgroundLetterAvatars size={60} name={props.post.displayName?props.post.displayName:"Anonymous"} />}
                            <div id="props-posts-info">
                                <h3 style={{width:'fit-content'}}>{props.post.displayName}</h3>
                                <p style={{fontSize:'12px',marginTop:'-8px'}}>Posted on: {props.date}</p>
                            </div>
                        </div>
                        <div style={{width:'100%',display:'flex'}}>
                            {bidding?
                            <Modal
                                open={bidding}
                                onClose={()=>setBidding(false)}
                            >
                                <BidForm bid={isBidderResult} postID={props.post.id} action={bidAction} setBidAction={setBidAction} reloader={reloader} setReloader={setReloader} post={props.post} amount = {props.post.amount} setBidding={setBidding}/>
                            </Modal>
                            :<></>
                            }
                        </div>
                        <div style={{width:'23%', display:'flex',justifyContent:'center'}}>{auth?.currentUser?.uid === props.post.userID?<TripleDotOption action="Post" postID={props.post.id} reload={props.reload} setReload={props.setReload} setEditingPost={setEditingPost} />:isBidderResult?<Button onClick={()=>{setBidding(true);setBidAction("edit")}} sx={{alignSelf:'flex-end',backgroundColor:'darkorange',color:'white','&:hover':{backgroundColor:'rgb(190, 106, 3)'}}} variant="contained">Edit Bid</Button>:<Button onClick={()=>{setBidding(true);setBidAction("post")}} sx={{alignSelf:'flex-end',backgroundColor:'#164C45','&:hover':{backgroundColor:'#164C59'}}} variant="contained" >Bid</Button>}</div>
                        
                    </div>
                    <hr style={{color:'#CC8D1A'}}></hr>
                    <div style={{width:'100%'}} >
                    {editingPost?
                    <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                        <TextField onChange={(e)=>setRequestDescription(e.target.value)} sx={{marginLeft:'70px',width:'88.5%', fontSize:'10px'}} defaultValue={props.post.description} label="Description" variant="filled" />
                        <div style={{alignSelf:'flex-end',display:'flex',gap:'5px',marginTop:'5px'}}>
                            <Button onClick={()=>setEditingPost(false)} color="error" variant="outlined" size="small">Cancel</Button>
                            <Button onClick={()=>editPost(props.post,requestDescription,props.reload,props.setReload)} color="success" variant="outlined">{loading?<CircularProgress size={25}/>:<>Save</>}</Button>
                        </div>
                        
                    </div>
                    :<>
                        <Typography sx={{marginLeft:'70px'}} variant="body1" gutterBottom>
                            {props.post.description}
                        </Typography>
                    </>}
                    </div>
                </div>
                <Accordion sx={{border:'none', width:'100%', alignSelf:'center', marginTop:'10px'}}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{backgroundColor:'navy',color:'white'}}
                    >
                    <Typography sx={{marginLeft:'40%'}}>View Replies</Typography>
                    <AvatarGroup max={4}>
                    </AvatarGroup>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField InputProps={{
                            endAdornment:auth?.currentUser?.photoURL?<img alt="userphoto" style={{height:'36px',borderRadius:'18px'}} id="userPhoto" src={auth?.currentUser?.photoURL}/>:<BackgroundLetterAvatars size={36} name={auth?.currentUser?.displayName?auth.currentUser.displayName:"Anonymous"} />
                        }} 
                        sx={{width:'100%'}} placeholder="Post a comment." multiline onChange={(e)=>setComment(e.target.value)} value={comment} />
                        <div style={{display:'flex', width:'100%',justifyContent:'flex-end'}}>
                            <LoadingButton size="small" loading={loading} onClick={()=>{postComment(props.post)}} sx={{marginTop:'3px',backgroundColor:"#CC8D1A"}} variant="contained"><SendIcon fontSize="small" /></LoadingButton>
                        </div>
                        {props.comment
                            .filter((usercomment) => usercomment.postID === props.post.id)
                            .map((filteredComment, index) => (
                                <Comment key={index} filteredComment={filteredComment} getComments={props.fetchComments} />
                        ))}
                    </AccordionDetails>
                </Accordion>
                </AccordionDetailsStyled>
            </AccordionStyled>
        </>
    )
}