import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = (props) => {
    const navigate = useNavigate()
    return (
        <>
            {
            props.posts.filter((post)=>post.status==='completed').length > 0?
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center', paddingTop:'20px',maxHeight:'85dvh'}}>
                    <table border='solid 1px black' >
                        <tbody style={{padding:'10px'}}>
                            <tr>
                                <th>Post ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Employee</th>
                                <th>Employee ID</th>
                                <th>Transaction Amount</th>
                                <th>Completion Date</th>
                            </tr>
                            {props.posts.filter((post)=>post.status==='completed').map((post,index)=>(
                                <tr align='center' style={{padding:'10px'}}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.category}</td>
                                    <td>{post.employeeName}</td>
                                    <td>{post.employeeID}</td>
                                    <td>{post.amount}</td>
                                    <td>{new Date(post.completionDate.seconds * 1000 + post.completionDate.nanoseconds / 1000000).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>:
                <>
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'88dvh',gap:'20px'}}>
                        <TimerOffIcon sx={{fontSize:'100px',color:'silver'}}/>
                        <Typography sx={{color:'silver', fontSize:'20px'}}>No Transaction History</Typography>
                        <Button onClick={()=>navigate('/')} variant='contained'>Browse Listings</Button>
                    </Box>
                </>
            }
        </>
    );
};



export default TransactionHistory;
