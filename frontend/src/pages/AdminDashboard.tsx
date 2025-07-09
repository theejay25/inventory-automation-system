import SideMenu from "../components/react/SideMenu"

// icons
import { FaBarsStaggered } from "react-icons/fa6";
import { useMenuStore } from "../store/menuStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function AdminDashboard() {

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
      <div className="text-white p-3" onClick={close}>

        <div className="w-full flex flex-row items-center lg:px-5 lg:w-[74vw] lg:ml-[26vw]  border-b-1 h-[7vh] lg:z-100">
         
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

          <p>Welcome, {user.name}</p>
        </div>

      </div>

      <div className="text-white">


        <SideMenu classname={`${isOpen ? 'side-div left-[-49vw] ' : ' side-div left-[0] '}`}/>
      </div>

    </>
  )
}

export default AdminDashboard
