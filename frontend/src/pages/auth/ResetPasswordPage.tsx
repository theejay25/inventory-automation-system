import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import ButtonLoader from "../../components/react/ButtonLoader";
import ToastModal from "../../components/react/ToastModal";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams(); // ✅ get token from URL

  const [password, setPassword] = useState("");
  const [sent, setSent] = useState('')

  const { formError, resetPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    const response: any = await resetPassword(password, token);

    if (!response.success) {
      // alert(response.message || "Error resetting password");
      return;
    }

    setSent("password successfully reset! Proceed to login");

    setTimeout(() => {
      navigate("/");
    }, 2000)
  };

  return (
    <>

    <div className="w-full flex justify-center">
      <ToastModal classname={`toast-div bg-red-500 ${formError ? 'top-25 opacity-100' : 'top-7 opacity-0'}`}>
          {formError}
      </ToastModal>
      <ToastModal classname={`toast-div bg-green-500 ${sent ? 'top-25 opacity-100' : 'top-7 opacity-0'}`}>
        {sent}
      </ToastModal>
    </div>

      <div className="h-[100vh] flex justify-center items-center">
        <div className="bg-[#2c2c2c] p-3">
          <div className="h-fit text-white font-semibold text-2xl py-3">
            Reset Password
          </div>
          <div className="w-full flex justify-center flex-col items-center">
            <form className="w-85" autoComplete="off" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-[#fcfcfc] font-semibold"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="bg-[#404040] text-white p-3 w-full mb-4"
                  placeholder="******"
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                  disabled={isLoading}
                  type="submit"
                  className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463] flex justify-center items-center"
              >
                  {isLoading ? <ButtonLoader /> : "SignIn"}
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
