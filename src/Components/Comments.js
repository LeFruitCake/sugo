import { useState } from "react";
import { db, auth } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Button, TextField } from "@mui/material";
import TripleDotOption from "./tripledot";
import BackgroundLetterAvatars from "./Avatar";

export default function Comment(props){
    const [editingComment,setEditingComment] = useState(true);//set to true by default with respect to ReadOnly 
    const [editedComment,setEditedComment] = useState("")
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
    return(
        <div id="comments" style={{display:'flex',gap:'5px',marginTop:'5px'}} >
            {props.filteredComment.photoURL?<img alt="userphoto" style={{height:'36px',borderRadius:'18px'}} src={props.filteredComment.photoURL} />:<BackgroundLetterAvatars size={36} name={props.filteredComment.displayName} />}
            <div id="comments-info">
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',height:'40px',alignItems:'center'}}>
                    <strong>{props.filteredComment.displayName}:</strong>
                    <div>{auth?.currentUser?.uid === props.filteredComment.userID?<TripleDotOption action="Comment" getComments={props.getComments} commentID={props.filteredComment.id} setEditingComment={setEditingComment} />:<></>}</div>
                </div>
                {editingComment?<div style={{backgroundColor:'rgb(228, 222, 222)',borderRadius:'8px',padding:'10px',width:'fit-content'}}>{props.filteredComment.comment}</div>:<TextField onChange={(e)=>setEditedComment(e.target.value)} variant="outlined" multiline sx={{width:'100%'}} defaultValue={props.filteredComment.comment} />}
                {editingComment?<></>:<Button onClick={()=>editComment(props.filteredComment.id)} variant="outlined" size="small" sx={{alignSelf:'flex-end', width:'fit-content',marginTop:'5px'}} >Save</Button>}
            </div>
        </div>
    )
}