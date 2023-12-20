import '../CSS/Biddings.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../config/firebase';
import {Box, Button, Divider, Typography} from '@mui/material'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from 'react-router-dom';
 
const Biddings = (props) => {
    const [bids,setBids] = useState([])
    const navigate = useNavigate()
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
                  filteredData.some((bid) => post.id === bid.postID) && post.status === 'open'
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
                      category:matchingPost.category,
                    };
                  }
                  return null;
                }).filter(Boolean);
      
                if (isMounted) {
                  setBids(joinedData);
                }
                console.log(joinedData)
              }
            }
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
        <>
          {bids.length > 0?
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
          :
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'88dvh',gap:'20px'}}>
            <AssignmentIndIcon sx={{color:'silver', fontSize:'100px'}}/>
            <Typography variant='subtitle1' sx={{color:'silver', fontSize:'20px'}}>You have yet made a bid on any listings</Typography>
            <Button onClick={()=>navigate('/')} variant='contained'>Browse Listings</Button>
          </Box>
          }
        </>
    );
};
 
function Bid(props){
    return(
        <div id='bid-container'>
            <div style={{display:'flex',flexDirection:'column'}}>
                <span><span style={{fontWeight:'bold'}}>Re:</span> {props.bid.title}</span>
                <span style={{display:'flex'}}>
                    {/* <span>{props.bid.photoURL?<img style={{width:'30px', borderRadius:'50%'}} src={props.bid.photoURL}/>:<BackgroundLetterAvatars name={props.bid.displayName} size={30}/>}</span> */}
                    <span><span style={{fontSize:'12px'}}>Posted by:</span> <span style={{fontWeight:'bold',fontSize:'15px'}}>{props.bid.displayName}</span></span>
                </span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                <span>Price <span>{props.bid.postAmount}</span></span>
                <span>Bid <span>{props.bid.bidAmount}</span></span>
            </div>
        </div>
    )
}
 
 
 
export default Biddings;