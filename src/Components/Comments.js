import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Button, TextField, Typography } from "@mui/material";
import TripleDotOption from "./tripledot";
import BackgroundLetterAvatars from "./Avatar";
import WavingHandIcon from '@mui/icons-material/WavingHand';

export default function Comment(props){
    const [editingComment,setEditingComment] = useState(true);//set to true by default with respect to ReadOnly 
    const [editedComment,setEditedComment] = useState("")
    const [isBidderResult,setIsBidderResult] = useState(null)
    const editComment = async(id)=>{
        try{
            await updateDoc(doc(db,"Comments",id),{
                comment:editedComment,
            }).then(()=>{
                props.getComments()
                setEditedComment("")
                setEditingComment(true)
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        const checkBidder = async () => {
            const result = await isBidder();
            setIsBidderResult(result);
        };

        const isBidder = async () =>{
            const data = await getDocs(
                query(collection(db, "Bids"),where("postID","==",props.filteredComment.postID),where("userID","==",props.filteredComment.userID))
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
        
        checkBidder();
    }, [props.filteredComment.postID, props.filteredComment.userID]);

    
    return(
        <div id="comments" style={{display:'flex',gap:'5px',marginTop:'5px'}} >
            {props.filteredComment.photoURL?<img alt="userphoto" style={{height:'46px',borderRadius:'18px'}} src={props.filteredComment.photoURL} />:<BackgroundLetterAvatars size={46} name={props.filteredComment.displayName} />}
            <div id="comments-info">
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',height:'40px',alignItems:'center'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {isBidderResult?<Typography variant="caption1" style={{color:'silver',fontSize:'15px'}} ><WavingHandIcon fontSize="small" />Bidder</Typography>:<></>}
                        <strong>{props.filteredComment.displayName}:</strong>
                    </div>
                    <div>{auth?.currentUser?.uid === props.filteredComment.userID?<TripleDotOption action="Comment" reload={props.reload} setReload = {props.setReload} getComments={props.getComments} commentID={props.filteredComment.id} setEditingComment={setEditingComment} />:<></>}</div>
                </div>
                {editingComment?<div style={{backgroundColor:'rgb(228, 222, 222)',borderRadius:'8px',padding:'10px',width:'fit-content'}}>{props.filteredComment.comment}</div>:<TextField onChange={(e)=>setEditedComment(e.target.value)} variant="outlined" multiline sx={{width:'100%'}} defaultValue={props.filteredComment.comment} />}
                {editingComment?<></>:<Button onClick={()=>editComment(props.filteredComment.id)} variant="outlined" size="small" sx={{alignSelf:'flex-end', width:'fit-content',marginTop:'5px'}} >Save</Button>}
            </div>
        </div>
    )
}