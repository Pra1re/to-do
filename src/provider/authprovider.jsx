import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile,
    updateEmail,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const authcontext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {

const [myeq,seteq]=useState([])


  const [user, setuser] = useState(null);
  const [photo, setphoto] = useState("");
  const [load, setload] = useState(true);

  const logout = () => {
    setload(true);
    signOut(auth)
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };
  

  const login = (email, password) => {
    setload(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createuser = (email, password) => {
    setload(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (user, profileData) => {
    return updateProfile(user, profileData)
      .then(() => {
        setuser({ ...user, ...profileData });
      })
      .catch((error) => console.error("Error updating profile:", error));
  };
  const updateUserEmail = (user, newEmail) => {
    return updateEmail(user, newEmail)
        .then(() => {
            setuser({ ...user, email: newEmail });
        })
        .catch(error => console.error("Error updating email:", error));
};


const updateUserPassword = (user, newPassword) => {
    return updatePassword(user, newPassword)
        .catch(error => console.error("Error updating password:", error));
};
const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };
  const deleteItem = (itemId) => {
    seteq((prevItems) => prevItems.filter(item => item._id !== itemId));
};
  const authinfo = {
    user,
    setuser,
    createuser,
    logout,
    login,
    load,
    photo,
    setphoto,
    updateUserProfile, 
    updateUserEmail, 
    updateUserPassword,
    googleLogin,
    myeq,
    seteq,
    deleteItem,
  };

  



  useEffect(() => {
    const stay = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      setload(false);
    });
    return stay;
  }, []);

  return <authcontext.Provider value={authinfo}>{children}</authcontext.Provider>;
};

export default Authprovider;
