import { NavLink, Outlet, useLocation } from "react-router-dom";
import '../CSS/dashboard.css'


//Components
import ProfileLogoDropdown from "../Components/ProfileLogoDropdown";
import Posts from "../Components/posts";

//MUI
import { AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import DoorbellRoundedIcon from '@mui/icons-material/DoorbellRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';


const Dashboard = (props) => {
    const location = useLocation()
    return (
        <>
            <AppBar disableGutters position="static" sx={{display:'flex',alignItems:'flex-end',backgroundColor:'white'}}>
                <Toolbar sx={{width:'75.5%',display:'flex',justifyContent:'space-between'}} disableGutters>
                    <Box id="navigation-bar-middle" sx={{display:'flex',width:'75%',alignItems:'center'}}>
                        <NavLink id='nav-btn' to="/"><HomeRoundedIcon sx={{fontSize:{xs:'30px',md:'40px'}}} /><Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1" >Home</Typography></NavLink>
                        <NavLink id='nav-btn' to="listings"><FactCheckRoundedIcon  sx={{fontSize:{xs:'30px',md:'40px'}}}/><Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1">Listings</Typography> </NavLink>
                        <NavLink id='nav-btn' to="biddings"><PaidRoundedIcon sx={{fontSize:{xs:'30px',md:'40px'}}}/> <Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1">Biddings</Typography></NavLink>
                        <NavLink id='nav-btn' to="history"><HistoryRoundedIcon sx={{fontSize:{xs:'30px',md:'40px'}}}/><Typography sx={{display:{xs:'none',md:'block'}}} variant="caption1" >History</Typography></NavLink>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                        <IconButton size="medium" sx={{height:'40px'}}  ><DoorbellRoundedIcon/></IconButton>
                        <IconButton size="medium" sx={{height:'fit-content'}} ><EmailOutlinedIcon/></IconButton>
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
