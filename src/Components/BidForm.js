import { Button, TextField, Typography } from "@mui/material";
import BidButton from "./BidButton";
import { useState } from "react";


const BidForm = (props) => {
    const [amount,setAmount] = useState(props.amount)
    const [message,setMessage] = useState("")
    return (
        <div id="bidform-container">
             <div id="bidform-subcontainer">
                <Typography variant="h4">Bid Request</Typography>
                <TextField onClick={()=>setMessage("")} onChange={(e)=>setAmount(e.target.value)} error={message} helperText={message} type="number" defaultValue={props.action === 'edit'?props.bid.amount:props.amount} label="Bid Amount" />
                <div id="bidform-buttons">
                    <Button onClick={()=>props.setBidding(false)} color="error">Cancel</Button>
                    <BidButton bid={props.bid} action={props.action} postID={props.postID} reloader={props.reloader} setReloader={props.setReloader} post={props.post} amount={amount} setMessage={setMessage} setBidding={props.setBidding} />
                </div>
             </div>
        </div>
    );
};




export default BidForm;
