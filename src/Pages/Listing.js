import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';


const Listing = () => {
    const location = useLocation()
    const navigate = useNavigate()
    let param = useParams()
    const [listings] = useOutletContext();
    const [displayListing,setDisplayListing] = useState(null)
    const fetchData = async ()=>{
        const data = await listings.filter((listing)=>listing.id === param.id)
        setDisplayListing(data)
    }
    useEffect(()=>{
        navigate(location.pathname)
        fetchData()
        
    },[listings,param.id])
    return (
        <div>
            {   
                // <>{console.log(displayListing)}</>
                displayListing?<>
                {displayListing[0].title}</>:<></>
            }
        </div>
    );
};



export default Listing;
