import { useState, type ChangeEvent } from "react"
import { useAuthStore } from "../../store/authStore"
import GlitchLoader from "../../components/react/Loader"

function ForgotPasswordPage() {

    const [sent, setSent] = useState(false)


    const {forgotPassword, error, user, isLoading} = useAuthStore()

    const messsage = useAuthStore(state => state.message)

    const [email, setEmail] = useState('')

    const handleSubmit = async (e: {preventDefault: () => void}) => {
        
        e.preventDefault()

        console.log(user)
        console.log(error)
      const response: any = await forgotPassword(email);

        if (!response.success) {
        return console.log(response.message || 'Error in password reset');
        }

        console.log(messsage)
    setSent(true);

    }

  return (
    <>
        <div className=" h-[100vh] flex justify-center items-center">
            <div className="bg-[#2c2c2c] p-3">
                <div className="h-fit text-white font-semibold text-2xl py-3">Forgot Password</div>
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
                                    required
                            />
                            </div>

                            {sent && (
                              <div className="p-3 bg-green-500 rounded-md text-center text-white mb-3">Reset password link has been sent to Email</div>
                          )}

                           <button
                                disabled={isLoading}
                                type="submit"
                                className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463]"
                            >
                                {isLoading ? <GlitchLoader /> : "SignIn"}
                            </button>
                        </form>

                        {error && <p className="text-red-500 text-center mb-3">{error}</p>}


                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPasswordPage