import { useState, type ChangeEvent } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import GlitchLoader from "../components/react/Loader"

function VerifyEmailPage() {

    const [code, setCode] = useState('')

    const {verifyEmail, user, isLoading, error} = useAuthStore()

    const navigate = useNavigate()

    const handleSubmit = async (e : {preventDefault: () => void}) => {

        e.preventDefault()

        console.log(user)
        console.log(error)

        await verifyEmail(code)

        if (!error) {
            navigate('/')
        }

    }

  return (
    <>
        <div className=" h-[100vh] flex justify-center items-center">
            <div className="bg-[#2c2c2c] p-3">
                <div className="h-fit text-white font-semibold text-2xl py-3">Verify Email</div>
                <div className="w-full flex justify-center flex-col items-center">
                    <div className="">
                        <form action="" className="w-85" autoComplete="off" onSubmit={handleSubmit}>
                            
                            <div>
                                <label htmlFor="code" className="block mb-1 text-[#fcfcfc] font-semibold">Token</label>
                                <input 
                                    name="code"
                                    type="text" 
                                    className="bg-[#404040] text-white p-3 w-full mb-4" 
                                    placeholder="Enter Token"
                                    autoComplete="off"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
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

                        {error && <p className="text-red-500 text-center">{error}</p>}

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VerifyEmailPage