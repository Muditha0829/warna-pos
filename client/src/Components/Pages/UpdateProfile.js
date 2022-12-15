import {  Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect,useState } from "react"
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { updateUserDataLocal, updateUserDataForeign, getData } from "../../firebase.api";


export function UpdateProfile(){
    
    const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
    const btnStyle={margin:'8px 0'};
    const textStyle={margin:'0px 0px 20px 0px'};
    const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
    backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
                };
    const successMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
          color:"#17ad30",textAlign:"center", borderRadius:"4px"
                };
    
    const [userId, setUserId] = useState([]);
    const [error,setError] = useState("");
    const [msg,setMsg] = useState(false);
    const [success,setSuccess] = useState("");
    
    useEffect(()=>{
        loader();
        getData(userId).then((res)=>{
            setCredentials(res);
        }).catch((e)=>{
            console.log(e);
        })
    },[userId])

    const [credentials,setCredentials] = useState({
        fullName:'',
        nic:'',
        passportNo:'',
        phoneNo:'',
    });
    

    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) =>{
            e.preventDefault();
            if(credentials.userType === "local"){
                console.log(credentials);
                updateUserDataLocal(userId,credentials).then((res)=>{
                    console.log(res);
                    setSuccess(res);
                    setMsg(false)
                }).catch((e)=>{
                    console.log(e);
                    setError(e);
                    setMsg(true);
                })
            }else{
                console.log(credentials);
                updateUserDataForeign(userId,credentials).then((res)=>{
                    console.log(res);
                    setSuccess(res);
                    setMsg(false)
                }).catch((e)=>{
                    console.log(e);
                    setError(e);
                    setMsg(true);
                })
            }
        }


    const loader = async () => {
        // const user = await getUser();
        onAuthStateChanged(getAuth(),(user)=>{
          if (user) {
            // setUser(user);
            setUserId(user.uid)
          }
        })

        
      }

      function displayMsg(){
        if(msg===true){
            return <div style={errorMsg}>{error}</div>
        }else{
            return <div style={successMsg}>{success}</div>
        }
      }



    return(
        <div>
            <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <h2>Update Profile </h2>
          <h3>Fill the feilds to update user data</h3>
        </Grid>
        <form onSubmit={handleSubmit}>
        <TextField label="Enter Your Full Name" type="text" name="fullName" fullWidth required style={textStyle} value={credentials.fullName} onChange={handleChange}/>
        <div>
         {credentials.userType==='local'
            ? <TextField label="Enter Your NIC" type="text" name="nic" fullWidth required style={textStyle} value={credentials.nic} onChange={handleChange} />
            : <TextField label="Enter Your Passport Number" type="text" name="passportNo" fullWidth required style={textStyle} value={credentials.passportNo} onChange={handleChange} />
        }
        </div>
        
        <TextField label="Enter Your Contact No" type="text" name="phoneNo" fullWidth required style={textStyle} value={credentials.phoneNo} onChange={handleChange} />
        {displayMsg()}

        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Update</Button>
        </form>
      </Paper>
        </div>
    )
}