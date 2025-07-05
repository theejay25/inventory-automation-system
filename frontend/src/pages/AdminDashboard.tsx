import SideMenu from "../components/react/SideMenu"

// icons
import { FaBarsStaggered } from "react-icons/fa6";
import { useMenuStore } from "../store/menuStore";
import { useParams } from "react-router-dom";

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


  const {open, isOpen, close} = useMenuStore() 

  return (
    <>
      <div className="text-white overflow-hidden p-3" onClick={close}>

         {isOpen && (
            <div
            className="fixed inset-0 w-fit p-3 cursor-pointer h-fit z-40"
            onClick={(e) => {
            e.stopPropagation()
            open()
            }}
            >
            <FaBarsStaggered size={28} />

            </div>
          )}

        <SideMenu classname={`${isOpen ? 'side-div left-[-45vw] ' : ' side-div left-[0vw] '}`}/>
      </div>
    </>
  )
}

export default AdminDashboard
