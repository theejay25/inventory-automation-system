import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/auth/SignupPage'
import SigninPage from './pages/auth/SigninPage'
import ForgotPasswordPage from './pages/auth/ForgotPassword'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'



function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/' element={<SigninPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                    <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
                    <Route path='/verify-email' element={<VerifyEmailPage />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/admin-dashboard' element={<AdminDashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
    
}

export default App