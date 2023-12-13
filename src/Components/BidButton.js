import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
// import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";


const BidButton = (props) => {
    const [loading,setLoading] = useState(false)
    const postBid = async ()=>{
        setLoading(true)
        await addDoc(collection(db,"Bids"),{
            amount:props.amount,
            userID: auth.currentUser.uid,
            postID: props.post.id,
        })
        .then(()=>{
            setLoading(false)
            props.setBidding(false)
            props.setReloader(!props.reloader)
        })
        .catch((e)=>{
            setLoading(false)
            props.setMessage("Failed to post bid request.")
        })
    }
    const editBid = async ()=>{
        try{
            await updateDoc(doc(db,'Bids',props.bid.id),{
                amount:props.amount,
            })
            .then(()=>{
                props.setBidding(false)
                props.setReloader(!props.reloader)
            })
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <LoadingButton loading={loading} onClick={()=>{
                if(props.amount < 0){
                    props.setMessage("Please enter a positive amount/")
                }else{
                    if(props.action ==='edit'){
                        editBid()
                    }else{
                        postBid()
                    }
                }
            }}>Save</LoadingButton>
        </div>
    );
};


export default BidButton;
