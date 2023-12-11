import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";


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
            
        })
    }
    return (
        <div>
            
        </div>
    );
};


export default BidButton;
