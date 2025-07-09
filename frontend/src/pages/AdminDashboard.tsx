import SideMenu from "../components/react/SideMenu"

// icons
import { FaBarsStaggered } from "react-icons/fa6";
import { useMenuStore } from "../store/menuStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import ProfileModal from "../components/react/ProfileModal";
import { useState } from "react";

function AdminDashboard() {

  const [edit, setEdit] = useState(true)

  const { path } = useParams();

// if (!path || path === "dashboard") {
//   return <DashboardHome />; // your default
// }

// switch (path) {
//   case "add-products":
//     return <AddProducts />;
//   case "products":
//     return <Products />;
//   case "stock-logs":
//     return <StockLogs />;
//   case "sales":
//     return <Sales />;
//   default:
//     return <NotFound />;
// }

  const {user} = useAuthStore()

  const {open, isOpen, close} = useMenuStore() 

  return (
    <>
      <div className="text-white" onClick={close}>

        <div className="nav-bar">
         
         {isOpen && (
            <div
            className="w-fit p-3 cursor-pointer h-fit z-40 lg:hidden"
            onClick={(e) => {
            e.stopPropagation()
            open()
            }}
            >
            <FaBarsStaggered size={28} />

            </div>
          )}

          <p className="lg:text-xl font-semibold">Welcome, {user.name}</p>
        </div>

      </div>

      <div className="text-white">
        <SideMenu classname={`${isOpen ? 'side-div left-[-49vw] ' : ' side-div left-[0] '}`}/>
      </div>

      <div className="main-area">

        <ProfileModal classname={`profile-modal`}>
          <div className="flex flex-row justify-center items-end gap-7 border-b-1 pb-7">
            <img src="" alt="user image" className="border-1 size-30 rounded-[100%]" />

            <div>
              <p className="text-xl font-semibold mb-1">{user.name}</p>
              <p className="mb-4">{user.email}</p>

              <p className="cursor-pointer text-blue-500 ml-23" onClick={() => setEdit(!edit)}>Edit Info</p>
            </div>
          </div>

          <div>
            <form>
              <div className={`flex flex-col mt-5 border-b-1 pb-7 ${edit ? 'hidden' : ''}`}>
                <label htmlFor="name" className="block mb-2">Edit Username</label>
                <input 
                  type="text" 
                  name="name" 
                  id="username" 
                  className="mb-4 rounded-md bg-[#404040] p-3"
                  placeholder="Username"
                />
                <input 
                  type="submit" 
                  value="Complete" 
                  className="bg-[#0A2463] cursor-pointer p-5 text-center text-white"
                />
              </div>
            </form>
          </div>

          <div className="mt-4 flex justify-center items-center">
            <button className="bg-red-500 cursor-pointer p-5 text-center text-white">Delete Account</button>
          </div>
        </ProfileModal>

      </div>

    </>
  )
}

export default AdminDashboard
