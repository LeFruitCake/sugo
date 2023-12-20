import React from 'react';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import {  Button, Typography, Box} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{height:'88dvh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column', gap:'30px'}}>
            <LayersClearIcon sx={{fontSize:'100px',color:'silver'}}/>
            <Typography sx={{color:'silver'}}>Page not found.</Typography>
            <Button onClick={()=>navigate('/')} variant='contained'>Back to dashboard</Button>
        </Box>
    );
};




export default PageNotFound;
