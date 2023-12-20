import React from 'react';
import {  Typography, Box} from "@mui/material";
import LayersClearIcon from '@mui/icons-material/LayersClear';

const ListingNotFound = () => {
    return (
        <div>
            <Box sx={{height:'88dvh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column', gap:'30px'}}>
                <LayersClearIcon sx={{fontSize:'100px',color:'silver'}}/>
                <Typography sx={{color:'silver'}}>Listing not found.</Typography>
                {/* <Button onClick={()=>navigate('/listings')} variant='contained'>Back to dashboard</Button> */}
            </Box>
        </div>
    );
};


export default ListingNotFound;
