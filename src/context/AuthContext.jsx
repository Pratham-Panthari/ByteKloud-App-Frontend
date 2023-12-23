import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        id: null,
        name: null,
        email:null,
        age: null,
        profession: null,
        gender: null,
        token: "",
    })
    useEffect(() => {
        const data = localStorage.getItem('auth')
        
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                id: parseData.id,
                name: parseData.name,
                email: parseData.email,
                age: parseData.age,
                profession: parseData.profession,
                gender: parseData.gender,
                token: parseData.token,
            })
        }
    }, [])
    return(
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }