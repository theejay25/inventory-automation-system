import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"






function Dashboard() {

  const navigate = useNavigate()
  const {logout, error, message} = useAuthStore()
  
  const handleClick = async () => {
      await logout()
  
   if (error) {
       console.log(error)
   } else {
      navigate('/')
   }
      console.log(message)
  }
  return (
    <>
        <div className="text-white">Dashboard</div>
        <button onClick={handleClick} className="bg-red-500 text-white p-3">Log out</button>
    </>
  )
}

export default Dashboard