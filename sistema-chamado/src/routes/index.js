import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/dashboard'
import Private from './Private'
import Profile from '../pages/Profile'
import Customers from '../pages/customers'
import New from '../pages/new'


export default function RouteApp() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
            <Route path="/profile" element={<Private><Profile /></Private>} />
            <Route path="/customers" element={<Private><Customers /></Private>} />
            <Route path="/new" element={<Private><New /></Private>} />
            <Route path="/new/:id" element={<Private><New /></Private>} />
        </Routes>
    )
}