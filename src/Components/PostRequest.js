import React, { useState } from 'react';


import { db, auth } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const PostRequest = (props) => {
    const [alert,setAlert] = useState("");
    const [posting,setPosting] = useState(false);
    const [category,setCategory] = useState("")
    const [requestTitle, setRequestTitle] = useState("")
    const [requestDescription, setRequestDescription] = useState("")
    const [amount,setAmount] = useState(0);
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
                userID: auth?.currentUser?.uid,
                category:category,
                postDate:serverTimestamp(),
                status:'open',
            }).then(()=>{
                setRequestTitle("")
                setRequestDescription("")
                setAmount(0)
                props.setReload(!props.reload)
                setAlert("")
                setPosting(false)
                props.setPosting(false)
            }).catch((error)=>{
                console.error(error)
                setPosting(false)
                setRequestTitle("")
                setRequestDescription("")
                setAmount(0)
                setAlert("Failed to post request.")
            })
        }
    }
    return (
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
                            <MenuItem value={"Tailoring"}>Tailoring</MenuItem>
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
                <div style={{width:'100%',display:'flex',alignItems:'center', justifyContent:'flex-end' ,gap:'10px'}}>
                    <Button onClick={()=>props.setPosting(false)} variant="contained" sx={{width:'80px', marginTop:'5px',}} color="error"> Cancel</Button>
                    <Button onClick={postRequest} variant="contained" sx={{backgroundColor:'#CC8D1A',width:'80px', marginTop:'5px','&:hover':{backgroundColor:'#8d6211'}}}>{posting?<CircularProgress size={25}/>:<>Post</>}</Button>
                </div>
            </div>
        </div>
    );
};

export default PostRequest;
