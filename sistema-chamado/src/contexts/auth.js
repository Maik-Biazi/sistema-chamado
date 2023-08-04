import { useState, createContext } from 'react'
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const navigate = useNavigate()

    async function signIn(email, password) {

        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid
                const docRef = doc(db, "users", uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl


                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success(`Bem vindo de volta ${docSnap.data().name}`)
                navigate("/dashboard")
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false)
                toast.error("Ops algo deu errado")
            })
    }
    // async function signUp(email, password, name) {
    //     setLoadingAuth(true)

    //     await createUserWithEmailAndPassword(auth, email, password)
    //         .then(async (value) => {
    //             let uid = value.user.uid


    //             await setDoc(doc(db, "users", uid), {
    //                 name: name,
    //                 avatarUrl: null
    //             })
    //                 .then(() => {
    //                     const token = user.getIdToken(); // Get the JWT token
    //                     let data = {

    //                         uid: uid,
    //                         name: name,
    //                         email: value.user.email,
    //                         avatarUrl: null,
    //                         token
    //                     }
    //                     setUser(data)
    //                     storageUser(data)
    //                     setLoadingAuth(false)
    //                     navigate("/dashboard")
    //                 })


    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             setLoadingAuth(false)
    //         })

    // }

    async function signUp(email, password, name) {
        setLoadingAuth(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken(); // Get the JWT token
            const userData = {
                uid: user.uid,
                email: user.email,
                name: name,
                avatarUrl: null,
                token, // Store the JWT token in the user data
            };

            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                avatarUrl: null,
            });

            setUser(userData);
            storageUser(userData);
            setLoadingAuth(false);
            toast.success(`seja Bem vindo ao sistema ${userData.name}`)
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            setLoadingAuth(false);
        }
    }
    function storageUser(data) {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider