import React from "react";
import { FormControl, InputLabel, OutlinedInput,InputAdornment,IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"



export default function PasswordField(props){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <FormControl sx={{ m: 0 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
            error={props.message!==""}
            onClick={()=>{props.setMessage("")}}
            onChange={(e)=>props.setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            label="Password"
            />
        </FormControl>
    )
}