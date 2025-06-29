import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

function AdminDashboard() {

   const navigate = useNavigate()
   const {logout, error, message} = useAuthStore()
    
    const handleClick = async () => {
        await logout()
    
        if (!error) {
          navigate('/')
        } else {
          console.log(error)          
        }
        console.log(message)
    }
  return (
    <>
      <div className="text-white">AdminDashboard</div>
      <button onClick={handleClick} className="bg-red-500 text-white p-3">Log out</button>      
    </>
  )
}

export default AdminDashboard