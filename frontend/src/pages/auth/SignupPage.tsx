import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import ButtonLoader from "../../components/react/ButtonLoader"
import ToastModal from "../../components/react/ToastModal"

function SignupPage() {

    const [sent, setSent] = useState('')
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signup, formError, user, isLoading} = useAuthStore()

    const navigate = useNavigate()

  const handleSubmit = async (e: { preventDefault: () => void }) => {

    e.preventDefault()

    console.log(user)

    
    const success =  await signup(name, email, password)
    
      if (success) {
          setSent('A verification token has ben sent to Your email')
      
              setTimeout(() => {
                  navigate('/verify-email');
              }, 2500)

        return
    }        

    setError(true)

    setTimeout(() => {
        setError(false)
    }, 2000)

    console.log(formError)
    
  }

   

  return (
    <>
        <ToastModal classname={` ${error ? 'bg-red-500 top-10' : 'top-6 opacity-0'} toast-div left-26 lg:left-[42vw]`} >
            {formError}
        </ToastModal>
        <ToastModal classname={` ${sent ? 'bg-green-500 top-15' : 'top-6 opacity-0'} toast-div left-16.5 lg:left-[40vw]`} >
           {sent}
        </ToastModal>
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

                             <button
                                disabled={isLoading}
                                type="submit"
                                className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463] flex justify-center items-center"
                            >
                                {isLoading ? <ButtonLoader /> : "SignUp"}
                            </button>
                        </form>

                        <p className="text-center text-white">Already have an Account? <Link to={'/'}>SignIn</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignupPage