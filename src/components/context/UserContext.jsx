import { createContext, useState, useEffect } from "react";
import { auth } from "../../Firebase/firebaseAuth";
import { getUser } from "../../Firebase/Users";

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
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            if (user) {
                getUser(user.uid).then(userDetails => {
                    setUserDetails(userDetails);
                });
            } else {
                setUserDetails(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{user, userDetails}}>
            {children}
        </UserContext.Provider>
    )
}