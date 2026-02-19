import React, { useEffect } from "react";
import axios from "axios";
export const userDataContext = React.createContext();

function UserContext({ children }) {
  const serverUrl = 'http://localhost:8000';
  const [userData, setUserData] = React.useState(null);
  
  const handleCurrentUser = async () =>{
    try{
        const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
        setUserData(result.data);
        console.log("Current User Data:", result.data);
    }catch(error){
        console.error("Error fetching current user data:", error);
    }
  }
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext
