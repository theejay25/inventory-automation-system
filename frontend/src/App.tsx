import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//pages
import SignupPage from './pages/auth/SignupPage'
import SigninPage from './pages/auth/SigninPage'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import ForgotPassword from './pages/auth/ForgotPassword'

import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Don't redirect yet
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};




function App() {
  
  const { checkAuth } = useAuthStore()

  useEffect(() => {
  console.log("App mounted — calling checkAuth");
  checkAuth();
}, [checkAuth]);


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/' element={<SigninPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin-dashboard'
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            
           </Route>
        <Route
          path='/admin-dashboard/:path'
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            
           </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
