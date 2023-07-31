import { useContext, useState, useEffect } from 'react'


const AuthProvider = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    function sigIn(email, password) {
        console.log(email)
        console.log(password)
        console.log('logado com sucesso')
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                sigIn
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider