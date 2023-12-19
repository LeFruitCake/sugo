import '../CSS/Biddings.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../config/firebase';
import {Divider} from '@mui/material'
import BackgroundLetterAvatars from '../Components/Avatar';
 
 
const Biddings = (props) => {
    const [bids,setBids] = useState([])
    useEffect(() => {
        let isMounted = true;
     
        const fetchBids = async () => {
          try {
            const data = await getDocs(
              query(
                collection(db, "Bids"),
                where("userID", "==", localStorage.getItem("uid"))
              )
            );
     
            if (isMounted && data.docs.length >= 1) {
              const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
     
              if (filteredData.length > 0) {
                const filteredPosts = props.posts.filter((post) =>
                  filteredData.some((bid) => post.id === bid.postID)
                );
     
                const joinedData = filteredData.map((bid) => {
                  const matchingPost = filteredPosts.find(
                    (post) => post.id === bid.postID
                  );
                  if (matchingPost) {
                    return {
                      postAmount: matchingPost.amount,
                      title: matchingPost.title,
                      displayName: matchingPost.displayName,
                      postDate: matchingPost.postDate,
                      bidAmount: bid.amount,
                      photoURL:matchingPost.photoURL,
                    };
                  }
                  return null;
                }).filter(Boolean);
     
                if (isMounted) {
                  setBids(joinedData);
                 
                }
                console.log(joinedData);
              }
            }
            console.log(data)
          } catch (error) {
            console.error("Error fetching bids:", error);
          }
         
        };
     
        fetchBids();
        return () => {
          isMounted = false;
        };
      }, [props.posts]);
    return (
        <div id='biddings-container'>
            <div id='mapped-bids'>
                {bids.map((bid,index)=>(
                    <div key={index} >
                        <Bid bid={bid}/>
                        <Divider />
                    </div>
                ))}
            </div>
        </div>
    );
};
 
function Bid(props){
    return(
        <div id='bid-container'>
            <div style={{display:'flex',flexDirection:'column'}}>
                <span><span style={{fontWeight:'bold',fontSize:'20px'}}>Re:</span> <span style={{fontSize:'20px'}}>{props.bid.title}</span></span>
                <span style={{display:'flex'}}>
                    {/* <span>{props.bid.photoURL?<img style={{width:'30px', borderRadius:'50%'}} src={props.bid.photoURL}/>:<BackgroundLetterAvatars name={props.bid.displayName} size={30}/>}</span> */}
                    <span><span style={{fontSize:'20px',fontWeight:'bold',}}>Posted by:</span> <span style={{fontSize:'20px'}}>{props.bid.displayName}</span></span>
                </span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                <span><span style={{fontWeight:'bold',fontSize:'20px'}}>Price:</span> <span style={{fontSize:'20px'}}> {props.bid.postAmount}</span></span>
                <span><span style={{fontWeight:'bold',fontSize:'20px'}}>Bid Amount:</span> <span style={{fontSize:'20px'}}>{props.bid.bidAmount}</span></span>
            </div>
        </div>
    )
}
 
 
 
export default Biddings;