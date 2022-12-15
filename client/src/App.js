import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./Components/Navbar";
import DashBoard from "./Components/Pages/Dashboard";
import Signin from "./Components/Pages/Signin";
import Signup from "./Components/Pages/Signup";
import Profile from "./Components/Pages/Profile";
import AccountSummery from "./Components/Pages/AccountSummery";


import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { UpdateProfile } from "./Components/Pages/UpdateProfile";
import { UpdatePassword } from "./Components/Pages/UpdatePassword";
import Logout from "./Components/Logout";


function App() {

  const [auths, setAuths] = React.useState(true);

  const loader = async () => {
    // const user = await getUser();
    onAuthStateChanged(getAuth(),(user)=>{
      if (!user) {
        setAuths(false);
      }else{
        // console.log(user);
        setAuths(true);
      }
    })
    
  };

  useEffect(()=>{
    loader()
  })


  return (
    
    <BrowserRouter>

    <NavBar/>
      <Routes>

        {!auths && (
          <Route path='/signin' element={<Signin/>}/>
        )}
        {!auths && (
          <Route path='/signup' element={<Signup/>}/>
        )}
        {auths && (
          <Route path='/' element={<DashBoard/>}/>
        )}
        {auths && (
           <Route path='/profile' element={<Profile/>}/>
        )}
        {auths && (
          <Route path='/updateprofile' element={<UpdateProfile/>}/>
        )}
        {auths && (
           <Route path='/updatepassword' element={<UpdatePassword/>}/>
        )}
        {auths && (
           <Route path='/accountsummery' element={<AccountSummery/>}/>
        )}

          <Route path='/logout' element={<Logout/>}/>
          
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
