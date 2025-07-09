
import { useState, type ChangeEvent } from "react";
import { useAuthStore } from "../../store/authStore";

//components
import ButtonLoader from "../../components/react/ButtonLoader";
import ToastModal from "../../components/react/ToastModal";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState('')

  const { formError, forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const response: any = await forgotPassword(email);

    if (!response.success) {
      alert(response.message || "Error sending email");
      return;
    }

    setSent("Password reset email successfully sent!");

    setTimeout(() => {
      setSent('')
    }, 2000)
  };

  return (
    <>

      <div>
        <ToastModal classname={`toast-div bg-red-500 ${formError ? 'top-25 opacity-100' : 'top-7 opacity-0' }`}>
            {formError}
        </ToastModal>
        <ToastModal classname={`toast-div bg-green-500 ${sent ? 'top-25 opacity-100' : 'top-7 opacity-0' }`}>
            {sent}
        </ToastModal>
      </div>
      
      <div className="h-[100vh] flex justify-center items-center">
        <div className="bg-[#2c2c2c] p-3">
          <div className="h-fit text-white font-semibold text-2xl py-3">
            Enter Email
          </div>
          <div className="w-full flex justify-center flex-col items-center">
            <form className="w-85" autoComplete="off" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="Email"
                  className="block mb-1 text-[#fcfcfc] font-semibold"
                >
                  Email
                </label>
                <input
                  name="Email"
                  type="email"
                  className="bg-[#404040] text-white p-3 w-full mb-4"
                  placeholder="Emter Email"
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <button
                  disabled={isLoading}
                  type="submit"
                  className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463] flex justify-center items-center"
              >
                  {isLoading ? <ButtonLoader /> : "Submit"}
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
