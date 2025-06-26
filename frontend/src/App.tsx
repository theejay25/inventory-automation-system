import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import ForgotPasswordPage from './pages/ForgotPassword'


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/signin' element={<SigninPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
    
}

export default App