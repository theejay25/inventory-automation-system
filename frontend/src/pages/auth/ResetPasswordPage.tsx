import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import GlitchLoader from "../../components/react/Loader";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams(); // ✅ get token from URL

  const [password, setPassword] = useState("");

  const { error, resetPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    const response: any = await resetPassword(password, token);

    if (!response.success) {
      alert(response.message || "Error resetting password");
      return;
    }

    alert("Password reset successfully!");
    navigate("/");
  };

  return (
    <>
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
                  className="text-white w-full text-center p-3 mb-2 rounded-md bg-[#0A2463]"
              >
                  {isLoading ? <GlitchLoader /> : "SignIn"}
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-center mb-3">{error}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
