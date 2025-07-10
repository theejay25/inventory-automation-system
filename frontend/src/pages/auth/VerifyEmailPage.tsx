import { useState, type ChangeEvent } from "react"
import { useAuthStore } from "../../store/authStore"
import { useNavigate } from "react-router-dom"
import ButtonLoader from "../../components/react/loaders/ButtonLoader"
import ToastModal from "../../components/react/ToastModal"

function VerifyEmailPage() {

    const [code, setCode] = useState('')
    const [error, setError] = useState(false)
    const [sent, setSent] = useState('')

    const {verifyEmail, user, isLoading, formError} = useAuthStore()

    const navigate = useNavigate()

    const handleSubmit = async (e : {preventDefault: () => void}) => {

        e.preventDefault()

        console.log(user)
        
        const success = await verifyEmail(code)
        
        if (success) {
            setSent('Your email has successfully been verified!')

            setTimeout(() => {
                navigate('/')
            }, 2000)
            return
        }

        console.log(formError)

        setError(true)

        setTimeout(() => {
            setError(false)
        }, 2000)



    }

  return (
    <>
        <div className="w-full justify-center flex">
            <ToastModal classname={`toast-div left-[22vw] lg:left-[42vw] bg-red-500 ${error ? 'top-15 lg:top-25 opacity-100' : 'top-7 opacity-0' }`}>
                {formError}
            </ToastModal>
            <ToastModal classname={`toast-div left-[18vw] lg:left-[40.5vw] bg-green-500 ${sent ? 'top-15 lg:top-25 opacity-100' : 'top-7 opacity-0' }`}>
                {sent}
            </ToastModal>
        </div>
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
                                className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463] flex justify-center items-center"
                            >
                                {isLoading ? <ButtonLoader /> : "Verify"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VerifyEmailPage