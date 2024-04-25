
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getUser } from "../../Firebase/firebaseDB";

export const UserContext = createContext({
    user: null,
    setUser: () => {},

    userDetails: null,
    setUserDetails: () => {}
});



export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));

        }
    }, [])
    useEffect(() => {
        if (user) {
            getUser(user.uid).then(userDetails => {
                setUserDetails(userDetails);
                console.log('got deets', userDetails);
            });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser, userDetails, setUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}



