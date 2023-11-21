import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import HistoryIcon from '@mui/icons-material/History';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from "./config/firebase";

export default function LeftNavigation(props) {
  const [showTransactionHistory, setShowTransactionHistory] = React.useState(true);
  const [showActiveListings, setShowActiveListings] = React.useState(true);
  const [activeListing, setActiveListing] = useState([]);
  const handleTransactionHistoryClick = () => {
    setShowTransactionHistory(!showTransactionHistory);
  };

  function getActiveListing(){  
    const activeListing = props.posts.filter((post)=>post.userID === auth?.currentUser?.uid);
    setActiveListing(activeListing)
  }

  useEffect(()=>{
    getActiveListing()
  },)
  const handleActiveListingsClick = () => {
    setShowActiveListings(!showActiveListings);
    console.log(activeListing)
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        padding: '10px',
      }}
    >
      <Accordion expanded={showTransactionHistory} onChange={handleTransactionHistoryClick}>
        <AccordionSummary>
          <ListItem>
            <ListItemAvatar>
              
                <HistoryIcon size="small" />
             
            </ListItemAvatar>
            <ListItemText primary="Transaction History" />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails sx={{display:'flex',alignItems:'center'}}>
          <p>No Transaction History</p>
        </AccordionDetails>
      </Accordion>
      <Divider variant="inset" component="li" />
      <Accordion expanded={showActiveListings} onChange={handleActiveListingsClick}>
        <AccordionSummary sx={{display:'flex',alignItems:'center'}}>
          <ListItem>
            <ListItemAvatar>
              
                <ChecklistOutlinedIcon size="small" />
             
            </ListItemAvatar>
            <ListItemText primary="Active Listings" />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails>
          {/* Content for Active Listings */}
          {activeListing.map((listing,index)=>(
            <div key={index}>{listing.title}</div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
         
        </ListItemAvatar>
      </ListItem>
    </List>
  );
}