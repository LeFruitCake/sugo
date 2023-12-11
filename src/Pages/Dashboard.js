import { NavLink, Outlet, useLocation } from "react-router-dom";
import '../CSS/dashboard.css'


//Components
import ProfileLogoDropdown from "../Components/ProfileLogoDropdown";
import Posts from "../Components/posts";

//MUI
import { IconButton, Typography} from "@mui/material";
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
            <div>
                <div id="navigation-bar">
                    <div id="navigation-bar-left">
                        <h1>SUGO</h1>
                        <h4>your hustle partner</h4>
                    </div>
                    <nav id="navigation-bar-middle">
                        <NavLink id='nav-btn' to="/"><HomeRoundedIcon fontSize="large" /><Typography variant="button" >Home</Typography></NavLink>
                        <NavLink id='nav-btn' to="listings"><FactCheckRoundedIcon fontSize="large"/><Typography variant="button">Listings</Typography> </NavLink>
                        <NavLink id='nav-btn' to="biddings"><PaidRoundedIcon fontSize="large"/> <Typography variant="button">Biddings</Typography></NavLink>
                        <NavLink id='nav-btn' to="history"><HistoryRoundedIcon fontSize="large"/><Typography variant="button" >History</Typography></NavLink>
                    </nav>
                    <div id="navigation-bar-right">
                            <IconButton size="medium" sx={{height:'40px'}}  ><DoorbellRoundedIcon/></IconButton>
                            <IconButton size="medium" sx={{height:'fit-content'}} ><EmailOutlinedIcon/></IconButton>
                            <ProfileLogoDropdown logInfo={props.logInfo} />
                    </div>
                </div>
                <div>
                    {location.pathname==="/"?<Posts setFetchingData={props.setFetchingData} fetchingData={props.fetchingData} reload={props.reload} setReload={props.setReload} comments={props.comments} posts={props.posts} fetchComments={props.fetchComments}/>:<></>}
                    <Outlet/>
                </div>
            </div>  
        </>
    );
};


export default Dashboard;
