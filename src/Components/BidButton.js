import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Button } from "@mui/material";


const BidButton = (props) => {
    // const postRequest = async () =>{
    //     if(requestTitle === "" || requestDescription === ""){
    //         setAlert("Please provide request title.")
    //     }else{
    //         setPosting(true)
    //         await addDoc(collection(db,"Posts"),{
    //             title:requestTitle,
    //             description:requestDescription,
    //             amount:amount,
    //             displayName:auth.currentUser.displayName,
    //             photoURL:auth.currentUser.photoURL,
    //             userID: auth?.currentUser?.uid,
    //             category:category,
    //             postDate:serverTimestamp(),
    //         }).then(()=>{
    //             setRequestTitle("")
    //             setRequestDescription("")
    //             setAmount(0)
    //             props.fetchData()
    //             setAlert("")
    //             setPosting(false)
    //             props.setPosting(false)
    //         }).catch((error)=>{
    //             console.error(error)
    //             setRequestTitle("")
    //             setRequestDescription("")
    //             setAmount(0)
    //             setAlert("Failed to post request.")
    //         })
    //     }
    // }
    const postBid = async ()=>{
        await addDoc(collection(db,"Bids"),{
            amunt:props.amount,
            userID: auth.currentUser.uid,
            postID: props.post.id,
        })
        .then(()=>{
            props.setBidding(false)
        })
        .catch((e)=>{
            props.setMessage("Failed to post bid request.")
        })
        // .finally(()=>{
        //     props.setBidding(false)
        // })
    }
    return (
        <div>
            <Button onClick={()=>{
                if(props.amount < 0){
                    props.setMessage("Please enter a positive amount/")
                }else{
                    postBid()
                }
            }} sx={{'&:hover':{backgroundColor:'#448292',color:'white'}}}>Save</Button>
        </div>
    );
};


export default BidButton;
