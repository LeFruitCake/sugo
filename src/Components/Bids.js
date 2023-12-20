import React, { useState } from 'react';
import BackgroundLetterAvatars from './Avatar';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import PhpIcon from '@mui/icons-material/Php';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';


const Bids = (props) => {
    const [confirmEmploy,setConfirmEmploy] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const editPost = async ()=>{
        try{
            setLoading(true)
            await updateDoc(doc(db,"Posts",props.postID),{
                status:'ongoing',
                employeeID:props.bid.id,
                employeeName:props.bid.displayName,
                employeePhotoURL:props.bid.photoURL,
                amount:props.bid.amount,
                completionDate:serverTimestamp(),
            }).then(()=>{
                setConfirmEmploy(false)
                setLoading(false)
                props.setReload(!props.reload)
                navigate('/listings')
            })
            // alert(props.postID)
        }catch(error){
            console.log(error)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
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
                <Button onClick={()=>setConfirmEmploy(true)} size='small' variant='contained' >Employ</Button>
                <Dialog
                    open={confirmEmploy}
                    onClose={()=>setConfirmEmploy(false)}
                >
                    <DialogTitle>
                        <Typography variant='h5'>{`Confirm employ ${props.bid.displayName}?`}</Typography>
                        <DialogContent sx={{display:'flex', flexDirection:'column',gap:'30px'}}>
                            <DialogContentText>
                                Please note that once employed, you cannot revert said employment.
                            </DialogContentText>
                            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                <Button onClick={()=>setConfirmEmploy(false)} variant='contained' color='error'>Cancel</Button>
                                <LoadingButton loading={loading} onClick={()=>editPost()} variant='contained' color='primary'>Yes</LoadingButton>
                            </Box>
                        </DialogContent>
                    </DialogTitle>
                </Dialog>
            </span>
        </div>
    );
};




export default Bids;
