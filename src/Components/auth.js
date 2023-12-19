import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { useState } from "react";
import "../CSS/auth.css"
import { Button, CircularProgress, TextField } from "@mui/material";
import PasswordField from "./passwordComponent";
import { useNavigate } from "react-router-dom";
export const Auth = (props) =>{
    const [firstname,setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [message,setMessage] = useState("")
    const [register,setRegister] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    let navigate = useNavigate()
    const Login = async () => {
        if(username === "" || password === ""){
            setMessage("Incomplete fields.")
        }else{
            setLoading(true)
            await signInWithEmailAndPassword(auth,username, password)
            .then((response)=>{
                props.logInfo(true)
                setMessage("")
                setLoading(false)
                localStorage.setItem('logStatus',true);
                localStorage.setItem('photoURL',response.user.photoURL)
                localStorage.setItem('displayName',response.user.displayName)
                localStorage.setItem('uid',response.user.uid)
                navigate('/')
        }).catch((error)=>{
                setMessage("Invalid email/password.")
                setLoading(false)
            })
        }
    }
    const Register = async ()=>{
        setLoading(true)
        const displayName = firstname +" "+ lastname;
        console.log(displayName)
        try{
            const user = await createUserWithEmailAndPassword(auth,username,password);
            await updateProfile(auth.currentUser,{
                displayName: displayName,
            })
            console.log(user)
            setRegister(false)
            setUsername("")
            setPassword("")
            setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    const googleLogin = async ()=>{
        await signInWithPopup(auth,googleProvider)
        .then((response)=>{
            console.log(response)
            props.logInfo(true)
            setLoading(false)
            localStorage.setItem('logStatus',true);
            localStorage.setItem('photoURL',response.user.photoURL)
            localStorage.setItem('displayName',response.user.displayName)
            navigate('/')
        }).catch((error)=>{
            console.log(error)
        })
    }

    const facebookLogin = async ()=>{
        auth.signOut(auth?.currentUser)
        await signInWithPopup(auth, facebookProvider)
        .then((response)=>{
            console.log(response.user)
            props.logInfo(true)
            localStorage.setItem('logStatus',true);
            localStorage.setItem('photoURL',response.user.photoURL)
            localStorage.setItem('displayName',response.user.displayName)
            navigate('/')
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    return (
        <>
            <div id="login-container-auth">
                {!register?
                <>
                    <div id="login">
                        <TextField value={username} error={message!==""} onClick={()=>{setMessage("")}} onChange={(e)=>setUsername(e.target.value)} helperText={message} id="outlined-basic" label="Email Address" variant="outlined" />
                        <PasswordField message={message} setPassword={setPassword} setMessage={setMessage}  />
                        <button id="login-btn" onClick={Login}>{loading?<CircularProgress size={20} />:<>Login</>}</button>
                        <button id="forgotpassword-btn">Forgot Password?</button>
                    </div>
                    <hr style={{width:'100%'}}></hr>
                    <div id="register-container">
                        <button onClick={()=>{setRegister(true);setUsername("");setPassword("");}} id="register-btn">Create new account</button>
                        <Button onClick={googleLogin} id="loginGmail" variant="outlined"><img alt="google-logo" id="google-logo" src="/google.png"/><p>Continue with Gmail</p></Button>
                        <Button onClick={facebookLogin} id="loginFacebook" variant="outlined"><img alt="facebook-logo" id="facebook-logo" src="/facebook.png"></img><p>Continue with Facebook</p></Button>
                    </div>
                </>:
                <>
                    <div id="Register">
                        <TextField value={username} placeholder="Email" onChange={(e)=> setUsername(e.target.value)} />
                        <TextField value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password"  />
                        <TextField onChange={(e)=>setFirstName(e.target.value)} placeholder="Firstname"/>
                        <TextField onChange={(e)=>setLastName(e.target.value)} placeholder="Lastname"/>
                        <Button variant="contained"  onClick={Register}>{loading?<CircularProgress/>:<>Register</>}</Button>
                        <hr style={{width:'100%'}}></hr>
                        <button id="forgotpassword-btn" onClick={()=>{setRegister(false); setMessage(""); setUsername("");setPassword("");}}>Already have an account? Login instead.</button>
                    </div>
                </>}
            </div>
        </>
    )
}