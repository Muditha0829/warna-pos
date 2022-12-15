import {  Button, Grid, Paper, TextField, Typography,Box,Fade } from "@mui/material";
import {Link} from "react-router-dom";
import React, { useState } from "react";
import Image from './../../Images/bus.webp'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

//Firebase libraries
import { signInUser } from "../../firebase.api";

const paperStyle={padding:'0 0 0 0', height:'auto', width:400, margin:'50px'};
const textStyle={margin:'0px 0px 20px 0px'};
const btnStyle={margin:'8px 0'};
const bottomText={margin:'10px 0px 10px 0px'};
const typoStyle={align:'center'};
const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                  backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
                };
const successMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                backgroundColor:"#17ad30",color:"white",textAlign:"center", borderRadius:"4px"
              };

const Signin=()=>{

  const [credentials,setCredentials] = useState({
    email:'',
    password:''
  });
  const [loading, setLoading] = React.useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  
  const navigate = useNavigate();

  function displayMsg(){
    if(error){
        return <div style={errorMsg}>{error}</div>
    }else if(success){
        return <div style={successMsg}>{success}</div>
    }
  }
  
    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});}

        const handleSubmit = async(e) =>{
          setLoading(true);
            e.preventDefault();
            signInUser(credentials).then((res) => {
              setSuccess(res);
              setLoading(false);
              navigate('/');
            }).catch((err) => {
              setLoading(false);
              setError(err);
            });
            
          }

  return(
    <div>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', margin:'auto'}}>
    <Box sx={{ height: 40 }}>
      <Fade in={loading}
        style={{ transitionDelay: loading ? '100ms' : '0ms', }}unmountOnExit>
        <CircularProgress />
      </Fade>
    </Box>
    </Box>

    <Grid container spacing={1} justifyContent='space-between'>
        <Grid item xs={4} sm={12} md={4} mt={20}>
        <Paper elevation={0} style={paperStyle}>
        <Grid align='center'>
          <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
        <TextField label="Enter Your Email Address" type="text" name="email" fullWidth required style={textStyle} value={credentials.email}
         onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password}
         onChange={handleChange}/>
          {displayMsg()}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}
        disabled={ !(/^([A-Za-z0-9_\-.])+@(["gmail"])+\.(["com"]{2,})$/.test(credentials.email)) }
        
        >Sign In</Button>
        </form>

        <div align='center' style={bottomText}>
          <div  className={typoStyle}>
        <Typography>
          <Link href="#">
          Forgot Password?
          </Link>
        </Typography>
        </div>
        </div>
        
        <div align='center'style={bottomText}>
        <Typography>Don't you have an account?
        <Link to="/signup">
            Sign Up
          </Link>
        </Typography>
        </div>
      </Paper>
        </Grid>

        <Grid item xs={8} sm={0} md={8} mt={18}>
        
        <img src={Image} style={{ maxWidth:900, maxHeight:500}} alt='img'/>

        </Grid>
      

    </Grid>
    </div>
    
  );
}


export default Signin;