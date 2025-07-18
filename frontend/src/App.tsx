import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotReady from "./pages/Error/NotReady";
import Addproducts from "./pages/children/Addproducts";
import Products from "./pages/children/Products";
import StockLogs from "./pages/children/StockLogs";
import Sales from "./pages/children/Sales";
import NotFound from "./pages/children/NotFound";

//hooks
import { useAuthStore } from "./store/authStore";
import { useEffect, useState } from "react";
import Users from "./pages/children/Users";
import Admins from "./pages/children/Admins";
import ProfileModal from "./components/react/ProfileModal";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="h-[100dvh] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (!(isAuthenticated && user)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AuthuserRoute = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="h-[100dvh] flex justify-center items-center text-white">
        Loading...
      </div>
    );
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (screenWidth > 560 && screenWidth < 1024) {
    return <NotReady />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <AuthuserRoute>
              <SignupPage />
            </AuthuserRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthuserRoute>
              <SigninPage />
            </AuthuserRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute>
                <AdminDashboard /> {/* <- the new wrapper with <Outlet /> */}
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="add-products" element={<Addproducts />} />
            <Route path="profile" element={<ProfileModal />} />
            <Route path="users" element={<Users />} />
            <Route path="admins" element={<Admins />} />
            <Route path="products" element={<Products />} />
            <Route path="stock-logs" element={<StockLogs />} />
            <Route path="sales" element={<Sales />} />
            <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
