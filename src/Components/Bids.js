import React from 'react';
import BackgroundLetterAvatars from './Avatar';
import { Button, Typography } from '@mui/material';
import PhpIcon from '@mui/icons-material/Php';


const Bids = (props) => {
    return (
        <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                {props.bid.photoURL?
                    <img alt='userPhoto' src={props.bid.photoURL} style={{width:'60px',borderRadius:'50%'}} />:
                    <BackgroundLetterAvatars name={props.bid.displayName} size={60}/>
                }
                <Typography variant='subtitle2' fontWeight={'bold'}>{props.bid.displayName}</Typography>
            </div>
            <span style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <span style={{display:'flex',alignItems:'center'}}><Typography variant='subtitle2' fontSize={30} >{props.bid.amount}</Typography><PhpIcon fontSize='large' /></span>
                <Button size='small' variant='contained' >Employ</Button>
            </span>
        </div>
    );
};




export default Bids;
