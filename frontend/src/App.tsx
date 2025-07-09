import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './pages/auth/SignupPage'
import SigninPage from './pages/auth/SigninPage'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import NotReady from './pages/Error/NotReady'

import { useAuthStore } from './store/authStore'
import { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!(isAuthenticated && user)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AuthuserRoute = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (user && isAuthenticated) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    console.log("App mounted — calling checkAuth");
    checkAuth();
  }, [checkAuth]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (screenWidth > 560 && screenWidth < 1024) {
    return <NotReady />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<AuthuserRoute><SignupPage /></AuthuserRoute>} />
        <Route path='/' element={<AuthuserRoute><SigninPage /></AuthuserRoute>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/admin-dashboard/*' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
