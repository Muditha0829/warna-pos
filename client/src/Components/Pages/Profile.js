import { useEffect,useState } from "react"
import { Grid, Paper,Button,Box,Fade, CircularProgress } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

// import { doc, getDoc } from "firebase/firestore";
import { getAuth,onAuthStateChanged } from 'firebase/auth';

// import { firestore } from "../../firebase.config";
import { getData,deleteUserWithData } from "../../firebase.api";

//Mui Icons
import NameIcon from '@mui/icons-material/Dns';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import IdIcon from '@mui/icons-material/Badge';

//import dialog components
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Profile(){

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //Styles in component
    const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
    const btnStyle={margin:'8px 0'};
    
    const [userId, setUserId] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    function fetchData(){
        getData(userId).then((res)=>{
            setLoading(false);
            setData(res);
        }).catch((e)=>{
            setLoading(false);
            console.log(e);
        })
        // console.log(data)
    }

    const loader = async () => {
        
        onAuthStateChanged(getAuth(),(user)=>{
          if (user) {
            setUserId(user.uid)
          }
        })
      }

    useEffect(()=>{
        fetchData();
        loader();

    })

    function afterDeletion(){
        deleteUserWithData().then((result) => {
            console.log(result)
            navigate('/signin')
        }).catch((err) => {
            console.log(err);
            alert(err);
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
            <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <Typography variant="h5" gutterBottom>My Profile </Typography>
            <Grid align='left' mt={5}>

            {<Typography variant="h6" gutterBottom><NameIcon/> &nbsp;&nbsp;Full Name : {data.fullName} </Typography>}
            <div>
                {data.userType==='local'
            ? <Typography variant="h6" gutterBottom><IdIcon/> &nbsp;&nbsp;NIC : {data.nic} </Typography>
            : <Typography variant="h6" gutterBottom><IdIcon/> &nbsp;&nbsp;Passport No : {data.passportNo} </Typography>
            }
        </div>
            {<Typography variant="h6" gutterBottom><AlternateEmailIcon/> &nbsp;&nbsp;Email : {data.email} </Typography>}
            {<Typography variant="h6" gutterBottom><ContactPhoneIcon/> &nbsp;&nbsp;Phone Number: {data.phoneNo} </Typography>}
            </Grid>

            <Button type="submit" color="primary" variant="contained" onClick={()=>{navigate('/updateprofile')}} fullWidth style={btnStyle}>Update Profile</Button>
            <Button type="submit" color="primary" variant="contained" onClick={()=>{navigate('/updatepassword')}} fullWidth style={btnStyle}>Change Password</Button>
            <Button type="submit" color="error" variant="outlined" onClick={handleClickOpen} fullWidth style={btnStyle}>Delete Account</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                    {'Do you want to delete this account?'}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this account, you will be lost your entered data and this account cannot be recovered again
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" variant="contained"  onClick={afterDeletion} autoFocus>Delete</Button>
                    </DialogActions>
                </Dialog>
                    </Grid>
        
                </Paper>
        </div>
    )
}