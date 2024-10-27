import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from '@/lib/appwrite'

export const GlobelContext = createContext()

const GlobelProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((data) => {
                if (data) {
                    setIsLoggedIn(true)
                    setUser(data)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])

    return <GlobelContext.Provider
        value={{
            isLoading,
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser
        }}
    >
        {children}
    </GlobelContext.Provider>
}

export default GlobelProvider