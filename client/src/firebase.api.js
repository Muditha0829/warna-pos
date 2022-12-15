//Firebase libraries
import {db} from './firebase.config';
import { doc, setDoc,getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged ,signOut,updatePassword,signInWithEmailAndPassword,deleteUser} from "firebase/auth";


// const db = firestore;
const auth = getAuth();
const currentUser = auth.currentUser;

export function userCheck(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
          return uid;
          // ...
        } else {
          // User is signed out
          console.log('No User');
          return 'No-User';
        }
      });
}

//Logout function for user to sign out
export function userSignOut(){
    signOut(auth);
}

//Register function for local user
export function registerLocalUser(user){
    return new Promise((resolve,reject)=>{
        createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential)=>{
            
            const userFromDb = userCredential.user;
            const userId = userCredential.user.uid;
            
            console.log(userCredential);
            console.log(userFromDb);
            
            const userDoc = {
            "uid":userId,
            "email":user.email,
            "fullName":user.fullName,
            "userType":'local',
            "nic":user.nic,
            'passportNo':'',
            "phoneNo":user.phoneNo,
            "amount":''
             }

            setDoc(doc(db, "userData", userId), userDoc);
            resolve('User Created Successfully');

        }).catch((error) => {
            if (error.code ==="auth/email-already-in-use") {
                reject("The email address is already in use");
            }else if (error.code === "auth/invalid-email") {
                reject("The email address is not valid.");
            } else if (error.code === "auth/operation-not-allowed") {
                reject("Operation not allowed.");
            } else if (error.code === "auth/weak-password") {
                reject("The password is too weak.");
            }

            return error;



          });

    })
}

//Register function for foreign user
export function registerForeignUser(user){
    return new Promise((resolve,reject)=>{
        createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential)=>{
            
            const userFromDb = userCredential.user;
            const userId = userCredential.user.uid;
            
            console.log(userCredential);
            console.log(userFromDb);
            
            const userDoc = {
            "uid":userId,
            "email":user.email,
            "fullName":user.fullName,
            "userType":'foreign',
            "passportNo":user.passportNo,
            "nic":'',
            "phoneNo":user.phoneNo,
            "amount":''
             }
    
            setDoc(doc(db, "userData", userId), userDoc);
            resolve('User Created Successfully');
    
    
        }).catch((error) => {
          if (error.code ==="auth/email-already-in-use") {
              reject("The email address is already in use");
          }else if (error.code === "auth/invalid-email") {
              reject("The email address is not valid.");
          } else if (error.code === "auth/operation-not-allowed") {
              reject("Operation not allowed.");
          } else if (error.code === "auth/weak-password") {
              reject("The password is too weak.");
          }
      
        });
    })

}

//Sign in function for user to sign in
export function signInUser(credentials){
    return new Promise((resolve,reject)=>{
        signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            resolve("User Loged in")
          })
          .catch((error) => {
            const errorCode = error.code;
            if(errorCode==='auth/wrong-password'){
              reject('Invalid Password')
            }else if(errorCode==='auth/user-not-found'){
              reject('Invalid Email Address')
            }
            console.log(errorCode);
          });
    })

  }

//Get User Data
export function getData(id) {
    return new Promise((resolve,reject)=>{
        db.collection("userData").doc(id).get().then((snapshot) => {
            resolve(snapshot.data());
            // console.log(snapshot.data())
            }).catch((e) => {
            reject(e);
            })
    })
}

//Update User Data - Local
export function updateUserDataLocal(id,updatedDoc){
    return new Promise((resolve,reject)=>{
        db.collection("userData").doc(id).update({
            fullName:updatedDoc.fullName,
            nic:updatedDoc.nic,
            phoneNo:updatedDoc.phoneNo

        }).then((res)=>{
            console.log('Data Updated Successfully');
            resolve('Data Updated Successfully')
        }).catch((e)=>{
            reject(e);
        })
    })
}

//Update User Data - Foreign
export function updateUserDataForeign(id,updatedDoc){
    return new Promise((resolve,reject)=>{
        db.collection("userData").doc(id).update({
            fullName:updatedDoc.fullName,
            passportNo:updatedDoc.passportNo,
            phoneNo:updatedDoc.phoneNo

        }).then((res)=>{
            console.log('Data Updated Successfully');
            resolve('Data Updated Successfully')
        }).catch((e)=>{
            reject(e);
        })
    })
}

//Update User password
export function resetUserPassword(user,newPassword){
    return new Promise((resolve,reject)=>{
        updatePassword(user,newPassword).then(()=>{
            resolve('Password Updated')
        }).catch((e)=>{
            reject(e.code);
        })
    })
}

//Delete user and firestore data
export function deleteUserWithData(){
    return new Promise((resolve,reject)=>{
        deleteUser(currentUser).then(() => {
            db.collection('userData').doc(currentUser.uid).delete().then(()=>{
                console.log('From API : Firestore Data Deleted Successfully');
            }).catch((e)=>{
                console.log('From API : ' + e);
            })
            resolve('User deleted Successfully');
          }).catch((error) => {
            reject(error + ': Out');
          });
    })
}

export function getAllData(){
    return new Promise((resolve,reject)=>{
        const docRef = doc(db, "userData", "KMGlh8RrzwexEAISii2eWeEWuHj1");
        try{
            const docSnap =  getDoc(docRef);
        console.log(docSnap.data());
        }catch (e) {
            console.log("Error getting cached document:", e);
          }
    })
}

