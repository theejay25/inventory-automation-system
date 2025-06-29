import { useState } from "react"

function ResetPasswordPage() {

    const [sent, setSent] = useState(false)

  return (
    <>
        <div className=" h-[100vh] flex justify-center items-center">
            <div className="bg-[#2c2c2c] p-3">
                <div className="h-fit text-white font-semibold text-2xl py-3">Reset Password</div>
                <div className="w-full flex justify-center flex-col items-center">
                    <div className="">
                        <form action="" className="w-85" autoComplete="off">
                            
                            <div>
                                <label htmlFor="password" className="block mb-1 text-[#fcfcfc] font-semibold">Password</label>
                                <input 
                                    name="Password"
                                    type="password" 
                                    className="bg-[#404040] text-white p-3 w-full mb-4" 
                                    placeholder="******"
                                    autoComplete="off"
                            />
                            </div>

                            <input 
                                type="submit" 
                                value="Submit" 
                                className="text-white w-full text-center p-3 mb-4 rounded-md bg-[#0A2463]"
                            />
                        </form>

                          {sent && (
                            <div className="p-3 bg-green-500 rounded-md text-center text-white mb-3">Reset password link has been sent to Email</div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResetPasswordPage