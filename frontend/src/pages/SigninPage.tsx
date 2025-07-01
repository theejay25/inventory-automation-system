import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import GlitchLoader from "../components/react/Loader"

function SigninPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {login, user, isLoading, error, message} = useAuthStore()

    const handleSubmit = async (e: {preventDefault: () => void}) => {
        e.preventDefault()

        console.log(user)
        console.log(error)
        console.log(message)

      const result: any = await login(email, password);

        if (!result.success) {
        alert(result.error || 'Login failed');
        return;
        }

        // Now you don’t care what’s in the store yet:
        if (result.role === 'admin' || result.message === 'Welcome Admin') {
        navigate('/admin-dashboard');
        } else if (result.role === 'employee' || result.message === 'Welcome User') {
        navigate('/dashboard');
        }
    }

  return (
    <>
        <div className=" h-[100vh] flex justify-center items-center">
            <div className="bg-[#2c2c2c] p-3">
                <div className="h-fit text-white font-semibold text-2xl py-3">SignIn</div>
                <div className="w-full flex justify-center flex-col items-center">
                    <div className="">
                        <form action="" className="w-85" autoComplete="off" onSubmit={handleSubmit}>
                            
                            <div>
                                <label htmlFor="email" className="block mb-1 text-[#fcfcfc] font-semibold">Email</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    className="bg-[#404040] text-white p-3 w-full mb-4" 
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                            />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-[#fcfcfc] font-semibold">Password</label>
                                <input 
                                    name="password"
                                    type="password" 
                                    className="bg-[#404040] text-white p-3 w-full mb-6" 
                                    placeholder="*****"
                                    autoComplete="new-password"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    required
                            />
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463]"
                            >
                                {isLoading ? <GlitchLoader /> : "SignIn"}
                            </button>
                        </form>

                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                            <Link to={'/forgot-password'} className="text-white ml-[34%]">Forgot Password</Link>
                      
                        <p className="text-center text-white mt-4">Don't have an Account? <Link to={'/signup'}>SignUp</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SigninPage