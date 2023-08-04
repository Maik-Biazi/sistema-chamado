import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/dashboard'
import Private from './Private'


export default function RouteApp() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        </Routes>
    )
}