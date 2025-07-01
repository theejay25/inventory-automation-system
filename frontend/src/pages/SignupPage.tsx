import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import GlitchLoader from "../components/react/Loader"

function SignupPage() {

    const [sent, setSent] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signup, error, user, isLoading} = useAuthStore()

    const navigate = useNavigate()

  const handleSubmit = async (e: { preventDefault: () => void }) => {

    e.preventDefault()

    console.log(user)

    console.log(error)

    await signup(name, email, password)

      if (error) {
        setSent(false); // don't show success message
        return; // stop here if there's an error
    }


    setSent(true)

        setTimeout(() => {
            navigate('/verify-email');
        }, 2500)
    
  }

   

  return (
    <>
        <div className=" h-[100vh] flex justify-center items-center">
            <div className="bg-[#2c2c2c] p-3">
                <div className="h-fit text-white font-semibold text-2xl py-3">SignUp</div>
                <div className="w-full flex justify-center flex-col items-center">
                    <div className="">
                        <form action="" className="w-85" autoComplete="off" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-1 text-[#fcfcfc] font-semibold">Username</label>
                                <input 
                                    name="name"
                                    type="text" 
                                    className="bg-[#404040] text-white p-3 w-full mb-4" 
                                    placeholder="Enter Username"
                                    autoComplete="no"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    required
                            />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-[#fcfcfc] font-semibold">Email</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    className="bg-[#404040] text-white p-3 w-full mb-4" 
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    required
                              />
                            </div>

                            {sent && (
                                <div className="p-3 bg-green-500 rounded-md text-center text-white mb-3">Login code has been sent to your Email</div>
                            )}

                             <button
                                disabled={isLoading}
                                type="submit"
                                className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463]"
                            >
                                {isLoading ? <GlitchLoader /> : "SignIn"}
                            </button>
                        </form>

                        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                        <p className="text-center text-white">Already have an Account? <Link to={'/'}>SignIn</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignupPage