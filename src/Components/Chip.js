

//MUI
import RadioIcon from '@mui/icons-material/Radio';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AirIcon from '@mui/icons-material/Air';
import BuildIcon from '@mui/icons-material/Build';
import FluorescentIcon from '@mui/icons-material/Fluorescent';
import { Chip } from '@mui/material';

const ChipComponent = (props) => {
    const colorPicker = (label)=>{
        switch (label){
            case 'Electronics':
                return 'mediumblue';
            case 'Food and Beverage Servicing':
                return 'coral';
            case 'Cosmetology':
                return 'hotpink';
            case 'Welding':
                return 'sienna';
            case 'Tailoring':
                return 'rebeccapurple'
            case 'Computer System Servicing':
                return 'teal'
            case 'Woodworking':
                return 'peru'
            case 'Electrical Systems':
                return 'dodgerblue'
            case 'Plumbing':
                return 'forestgreen'
            case 'Automotive':
                return 'black'
            case 'Hair Dressing':
                return 'crimson'
            default:
                return 'grey';
        }
    }

    const iconPicker = (label)=>{
        switch (label){
            case 'Automotive':
                return <BuildIcon fontSize="small" style={{color:'white'}} />
            case 'Electronics':
                return <RadioIcon fontSize="small" style={{color:'white'}} />
            case 'Cosmetology':
                return <FaceRetouchingNaturalIcon fontSize="small" style={{color:'white'}}/>
            case 'Tailoring':
                return <ContentCutIcon fontSize="small" style={{color:'white'}}/>
            case 'Woodworking':
                return <CarpenterIcon fontSize="small" style={{color:'white'}}/>
            case 'Computer System Servicing':
                return <ImportantDevicesIcon fontSize="small" style={{color:'white'}}/>
            case 'Welding':
                return <LocalFireDepartmentIcon fontSize="small" style={{color:'white'}}/>
            case 'Food and Beverage Servicing':
                return <BrunchDiningIcon fontSize="small" style={{color:'white'}}/>
            case 'Electrical Systems':
                return <ElectricBoltIcon fontSize="small" style={{color:'white'}}/>
            case 'Plumbing':
                return <PlumbingIcon fontSize="small" style={{color:'white'}}/>
            case 'Hair Dressing':
                return <AirIcon fontSize="small" style={{color:'white'}}/>
            default:
                return <FluorescentIcon/>
        }
    }
    
    return (
        <Chip icon={iconPicker(props.category)} label={props.category} variant="outlined" sx={{backgroundColor:colorPicker(props.category),color:'white',padding:'5px',borderColor:colorPicker(props.category)}} size="small" />
    );
};


export default ChipComponent;
