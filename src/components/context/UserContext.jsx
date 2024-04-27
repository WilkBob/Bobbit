import { createContext, useState, useEffect } from "react";
import { getUser } from "../../Firebase/firebaseDB";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    userDetails: null,
    setUserDetails: () => {}
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (!userDetails) {
                getUser(user.uid).then(userDetails => {
                    setUserDetails(userDetails);
                });
            }
        }
    }, [user]);

    

    return (
        <UserContext.Provider value={{user, setUser, userDetails, setUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}