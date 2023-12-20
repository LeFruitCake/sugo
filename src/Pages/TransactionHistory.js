import { Box } from '@mui/material';
import React from 'react';


const TransactionHistory = (props) => {
    return (
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
        </Box>
    );
};



export default TransactionHistory;
