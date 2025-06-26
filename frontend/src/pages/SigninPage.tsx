import { Link } from "react-router-dom"

function SigninPage() {


  return (
    <>
        <div className=" h-[100vh] flex justify-center items-center">
            <div className="bg-[#2c2c2c] p-3">
                <div className="h-fit text-white font-semibold text-2xl py-3">SignIn</div>
                <div className="w-full flex justify-center flex-col items-center">
                    <div className="">
                        <form action="" className="w-85" autoComplete="off">
                            
                            <div>
                                <label htmlFor="email" className="block mb-1 text-[#fcfcfc] font-semibold">Email</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    className="bg-[#404040] text-white p-3 w-full mb-4" 
                                    placeholder="Enter Email"
                                    autoComplete="off"
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
                            />
                            </div>

                            <input 
                                type="button" 
                                value="SignIn" 
                                className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463]"
                            />
                        </form>
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