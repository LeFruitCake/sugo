import { NavLink, Outlet, useLocation } from "react-router-dom";
import '../CSS/dashboard.css'


//Components
import ProfileLogoDropdown from "../Components/ProfileLogoDropdown";
import Posts from "../Components/posts";

//MUI
import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import DoorbellRoundedIcon from '@mui/icons-material/DoorbellRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
// import { useState } from "react";


const Dashboard = (props) => {
    // const [notifCount, setNotifCount] = useState(0)
    const location = useLocation()
    return (
        <>
            <AppBar position="static" sx={{display:'flex',alignItems:'flex-end',backgroundColor:'white'}}>
                <Toolbar sx={{width:'100%',display:'flex',justifyContent:'space-around',color:'black'}} disableGutters>
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center', width:'20%'}}>
                        <Typography variant="h4" component="span" sx={{fontSize:{xs:'20px',md:'35px', color:'midnightblue'}}} >Sugo</Typography>
                        <Typography variant="caption1" fontWeight="bold" sx={{fontSize:{xs:'10px',md:'15px', color:'#164C45'}}} component="span">Your hustle partner</Typography>
                    </Box>
                    <Box id="navigation-bar-middle" sx={{display:'flex',width:'50%',alignItems:'center'}}>
                        <NavLink id='nav-btn' to="/"><HomeRoundedIcon sx={{fontSize:{xs:'30px',md:'40px'}}} /><Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1" >Home</Typography></NavLink>
                        <NavLink id='nav-btn' to="listings"><FactCheckRoundedIcon  sx={{fontSize:{xs:'30px',md:'40px'}}}/><Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1">Listings</Typography> </NavLink>
                        <NavLink id='nav-btn' to="biddings"><PaidRoundedIcon sx={{fontSize:{xs:'30px',md:'40px'}}}/> <Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1">Biddings</Typography></NavLink>
                        <NavLink id='nav-btn' to="history"><HistoryRoundedIcon sx={{fontSize:{xs:'30px',md:'40px'}}}/><Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1" >History</Typography></NavLink>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                        {/* <Tooltip title="Notifications">
                            <Badge color="warning" badgeContent={1}>
                                <IconButton size="medium" sx={{padding:'0px'}} ><DoorbellRoundedIcon fontSize="medium"/></IconButton>
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Messages" >
                            <Badge color="warning"  >
                                <IconButton size="medium" sx={{padding:'0px'}} ><EmailOutlinedIcon fontSize="medium" /></IconButton>
                            </Badge>
                        </Tooltip> */}
                        <ProfileLogoDropdown logInfo={props.logInfo} />
                    </Box>
                </Toolbar>
            </AppBar>
            <div>
            {location.pathname==="/"?<Posts setFetchingData={props.setFetchingData} fetchingData={props.fetchingData} reload={props.reload} setReload={props.setReload} comments={props.comments} posts={props.posts} fetchComments={props.fetchComments}/>:<></>}
            <Outlet/>
            </div>
        </>
    );
};


export default Dashboard;
