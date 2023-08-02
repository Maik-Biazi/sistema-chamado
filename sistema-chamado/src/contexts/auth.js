import { useState, createContext } from 'react'
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'


export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    function sigIn(email, password) {
        console.log(email)
        console.log(password)
        console.log('logado com sucesso')
    }
    async function signUp(email, password, name) {
        setLoadingAuth(true)
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await setDoc(doc(db, "users", uid), {
                    name: name,
                    avatarUrl: null
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                            avatarUrl: null
                        }
                        setUser(data)
                        setLoadingAuth(false)
                    })


            })
            .catch((error) => {
                console.log(error)
                setLoadingAuth(false)
            })

    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                sigIn,
                signUp,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider