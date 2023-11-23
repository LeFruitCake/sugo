import "./posts.css"
import * as React from 'react';
import { auth, db} from "./config/firebase";
import { collection, getDocs, addDoc,updateDoc, serverTimestamp, query, orderBy, doc, where } from "firebase/firestore";//updateDoc, deleteDoc 
import { useEffect, useState } from "react";
import BackgroundLetterAvatars from "./Avatar";
import {  Button, CircularProgress, TextField, Typography, Accordion, AccordionDetails, Chip, Skeleton, AvatarGroup, MenuItem, Select, FormControl, InputLabel, IconButton, InputAdornment} from "@mui/material";
import TripleDotOption from "./tripledot";
import LeftNavigation from "./Divider";
import { styled } from '@mui/material/styles';
import FluorescentIcon from '@mui/icons-material/Fluorescent';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Stack } from "@mui/system";
import PhpIcon from '@mui/icons-material/Php';
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountMenu from "./ProfileLogoDropdown";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Comment from "./Comments";



export default function Posts(props){
    const [posts,setPosts] = useState([]);
    const [comments,setComments] = useState([]);
    const [requestTitle, setRequestTitle] = useState("")
    const [requestDescription, setRequestDescription] = useState("")
    const [amount,setAmount] = useState(0);
    const [alert,setAlert] = useState("");
    const [posting,setPosting] = useState(false);
    const [reload,setReload] = useState(false);
    const [fetchingData,setFetchingData] = useState(false)
    const [category,setCategory] = useState("")
    const [filteredCategory, setFilteredCategory] = useState("All")
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
            // console.log(posts)
          } catch (err) {
            // console.error(err);
          }
    }
    const fetchComments = async ()=>{
        try{
            const comments = await getDocs(
                query(collection(db,"Comments"),orderBy("postDate","desc"))
            );
            const filteredComments = comments.docs.map((comment)=>({
                ...comment.data(),
                id:comment.id,
            }))
            setComments(filteredComments);
        }catch(err){
            console.err(err)
        }
    }
    useEffect(()=>{
        fetchData()
        fetchComments()
    },[reload])

    const postRequest = async () =>{
        if(requestTitle === "" || requestDescription === ""){
            setAlert("Please provide request title.")
        }else{
            setPosting(true)
            await addDoc(collection(db,"Posts"),{
                title:requestTitle,
                description:requestDescription,
                amount:amount,
                displayName:auth.currentUser.displayName,
                photoURL:auth.currentUser.photoURL,
                userID: auth.currentUser.uid,
                category:category,
                postDate:serverTimestamp(),
            }).then(()=>{
                setRequestTitle("")
                setRequestDescription("")
                setAmount(0)
                fetchData()
                setAlert("")
                setPosting(false)
            }).catch((error)=>{
                console.error(error)
                setRequestTitle("")
                setRequestDescription("")
                setAmount(0)
                setAlert("Failed to post request.")
            })
        }
    }
    return(
        <>
            <div id="app-container-posts">
                <div id="posts-navigation-bar">
                    <div id="posts-navigation-bar-sugo">
                        <img id="sugo-logo" alt="sugo-logo" src="/sugo-logo.png" />
                        <TextField id="input-with-icon-textfield" variant="standard" type="search" InputProps={{
                            startAdornment:(<InputAdornment position="start"><SearchOutlinedIcon size="small"/></InputAdornment>),
                        }} size="small" sx={{backgroundColor:'white', padding:'10px',borderRadius:'20px',width:'50%'}} placeholder="Search" />
                    </div>
                    <div></div>
                    <div></div>
                    <div id="posts-navigation-bar-right">
                        <IconButton sx={{backgroundColor:'#CC8D1A', '&:hover':{backgroundColor:'#8d6211'},color:'white'}} size="large" ><EmailOutlinedIcon size="large" /></IconButton>
                        <IconButton sx={{backgroundColor:'#CC8D1A', '&:hover':{backgroundColor:'#8d6211'},color:'white'}} size="large" ><NotificationsNoneIcon size="large" /></IconButton>
                        <AccountMenu logInfo={props.logInfo} />
                    </div>
                </div>
                <div id="feed-area">
                    <div id="feed-area-left">
                        <LeftNavigation posts={posts}/>
                    </div>
                    <div id="feed-area-middle">
                        <div id="filter-container">
                        <FormControl sx={{width:'80%'}} size="small">
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category"
                            value={filteredCategory}
                            onChange={ async (e)=>{
                                setFetchingData(true)
                                setFilteredCategory(e.target.value)
                                try {
                                    if(e.target.value === "All"){
                                        fetchData();
                                    }else{
                                        const data = await getDocs(
                                            query(collection(db, "Posts"), orderBy("postDate", "desc"),where("category","==",e.target.value))
                                        )
                                        const filteredData = data.docs.map((doc) => ({
                                            ...doc.data(),
                                            id: doc.id,
                                          }));
                                        setPosts(filteredData)
                                        setFetchingData(false)
                                        console.log(posts)
                                    }
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                            >
                                <MenuItem value={"All"}>All</MenuItem>
                                <MenuItem value={"Automotive"}>Automotive</MenuItem>
                                <MenuItem value={"Computer System Servicing"}>Computer System Servicing</MenuItem>
                                <MenuItem value={"Cosmetology"}>Cosmetology</MenuItem>
                                <MenuItem value={"Dress Making"}>Dress Making</MenuItem>
                                <MenuItem value={"Electrical Systems"}>Electrical Systems</MenuItem>
                                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                                <MenuItem value={"Food and Beverage Servicing"}>Food and Beverage Servicing</MenuItem>
                                <MenuItem value={"Hair Dressing"}>Hair Dressing</MenuItem>
                                <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                <MenuItem value={"Welding"}>Welding</MenuItem>
                                <MenuItem value={"Woodworking"}>Woodworking</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <FormControl sx={{width:'15%'}} size="small">
                            <Input
                                id="filled-adornment-amount"
                                startAdornment={<InputAdornment position="start">Php</InputAdornment>}
                            />
                        </FormControl> */}
                        </div>

                        {fetchingData?
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
                            posts.length > 0?
                            posts.map((post,index)=>{
                                const mappedComments = comments.filter((comment)=>comment.postID === post.id);
                                return(
                                    <Post getComments={fetchComments} comment={mappedComments} key={index} post={post} reload={reload} setReload={setReload} date={new Date(post.postDate.seconds * 1000 + post.postDate.nanoseconds / 1000000).toLocaleDateString()} />
                                )
                            }):
                            <><h1 style={{alignSelf:'center'}}>No Available Listing.</h1></>
                            }
                        </div>}
                    </div>
                    <div id="feed-area-right">
                        <div id="post-request">
                            <Typography sx={{alignSelf:'center', fontSize:'20px',fontWeight:'bold', color:'#164C45'}} variant="button" display="block" gutterBottom>
                                Create Request
                            </Typography>
                            <div id="user-info-inputbox">
                                <TextField sx={{width:'100%'}} value={requestTitle} error={alert !== ""} helperText={alert} label="Request Title" variant="outlined" onChange={(e)=> setRequestTitle(e.target.value)} type="text" onClick={()=>setAlert("")} /><br/>
                            </div>
                            <div id="user-info-inputbox-description">
                                <TextField sx={{width:'100%'}} minRows={4} variant="filled" label="Description" multiline onChange={(e)=>setRequestDescription(e.target.value)} value={requestDescription} />
                            </div>
                            <div id="request-buttons">
                                <FormControl sx={{width:'50%'}} size="small">
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                    value={category}
                                    label="Category"
                                    onChange={(e)=>setCategory(e.target.value)}
                                    >
                                        <MenuItem value={"Automotive"}>Automotive</MenuItem>
                                        <MenuItem value={"Computer System Servicing"}>Computer System Servicing</MenuItem>
                                        <MenuItem value={"Cosmetology"}>Cosmetology</MenuItem>
                                        <MenuItem value={"Dress Making"}>Dress Making</MenuItem>
                                        <MenuItem value={"Electrical Systems"}>Electrical Systems</MenuItem>
                                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                                        <MenuItem value={"Food and Beverage Servicing"}>Food and Beverage Servicing</MenuItem>
                                        <MenuItem value={"Hair Dressing"}>Hair Dressing</MenuItem>
                                        <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                        <MenuItem value={"Welding"}>Welding</MenuItem>
                                        <MenuItem value={"Woodworking"}>Woodworking</MenuItem>
                                    </Select>
                                </FormControl>
                                <div id="amount-div"><span>Php</span><input onChange={(e)=>setAmount(e.target.value)} id="bid-amount" type="number" step="10" min="0" value={amount}/></div>
                            </div>
                            <Button onClick={postRequest} variant="contained" sx={{backgroundColor:'#CC8D1A',width:'100%', marginTop:'5px','&:hover':{backgroundColor:'#8d6211'}}}>{posting?<CircularProgress size={25}/>:<>Post</>}</Button>
                        </div>
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
    '&:not(:last-child)': {
      borderBottom: 0,
    },
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
    backgroundColor:'white',
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
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }
    const [comment,setComment] = useState("")
    const postComment = async (post) =>{
        setLoading(true)
        await addDoc(collection(db,"Comments"),{
            postID:post.id,
            photoURL:auth.currentUser.photoURL,
            displayName:auth.currentUser.displayName,
            comment:comment,
            postDate:serverTimestamp(),
            userID:auth.currentUser.uid,
        })
        .then(()=>{
            props.getComments()
            setComment("")
            setLoading(false)
        })
        .catch((error)=>{
            console.error(error)
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
    
    
    return(
        <>
            <AccordionStyled expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummaryCustomized aria-controls="panel1d-content" id="panel1d-header">
                <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        <Typography fontSize={20} variant="h3" gutterBottom>
                            {props.post.title}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {auth.currentUser.uid === props.post.userID?
                            <Stack direction="row" spacing={1} sx={{alignSelf:'flex-start'}}>
                            <Chip icon={<FluorescentIcon />} color="warning" label="Yours" variant="outlined" size="small" />
                            </Stack>:<></>}
                            <Stack direction="row" spacing={1}>
                                {props.post.category?<Chip label={props.post.category} variant="outlined" color="primary" size="small" />:<Chip label="None" variant="outlined" size="small" />}
                            </Stack>
                        </Stack>
                        
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <div style={{display:'flex',flexDirection:'column'}} >
                            {props.post.amount === 0?
                                <Typography variant="button" gutterBottom fontSize={20}>FREE</Typography>:
                                <Typography sx={{display:'flex'}} fontSize={30} variant="h3" gutterBottom>
                                    {parseInt(props.post.amount).toLocaleString()}
                                <PhpIcon  fontSize="large"/>
                                </Typography>
                            }
                            {props.userID !== auth.currentUser.uid?<Button sx={{alignSelf:'flex-end',backgroundColor:'#CC8D1A','&:hover':{backgroundColor:'#8d6211'}}} variant="contained" >Bid</Button>:<></>}
                        </div>
                    </div>
                </div>
                </AccordionSummaryCustomized>
                <AccordionDetailsStyled>
                <div style={{padding:'10px', backgroundColor:'white',marginTop:'5px'}}>
                    <div id="user-info-inputbox">
                        <div style={{display:'flex', alignItems:'center',gap:'10px'}}>
                            {props.post.photoURL?<img alt="userphoto" id="userPhoto" src={props.post.photoURL}/>:<BackgroundLetterAvatars size={60} name={props.post.displayName?props.post.displayName:"Anonymous"} />}
                            <div id="props-posts-info">
                                <h3 style={{}}>{props.post.displayName}</h3>
                                <p style={{fontSize:'12px',marginTop:'-8px'}}>Posted on: {props.date}</p>
                            </div>
                        </div>
                        <div>{auth.currentUser.uid === props.post.userID?<TripleDotOption action="Post" postID={props.post.id} reload={props.reload} setReload={props.setReload} setEditingPost={setEditingPost} />:<></>}</div>
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
                    <AccordionSummaryCustomized
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{marginLeft:'40%'}}>View Replies</Typography>
                    <AvatarGroup max={4}>
                    </AvatarGroup>
                    </AccordionSummaryCustomized>
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
                                <Comment key={index} filteredComment={filteredComment} getComments={props.getComments} />
                        ))}
                    </AccordionDetails>
                </Accordion>
                </AccordionDetailsStyled>
            </AccordionStyled>
        </>
    )
}