import SideMenu from "../components/react/SideMenu"

// icons
import { FaBarsStaggered } from "react-icons/fa6";
import { useMenuStore } from "../store/menuStore";

function AdminDashboard() {

  const {open, isOpen, close} = useMenuStore() 

  return (
    <>
      <div className="text-white overflow-hidden p-3" onClick={close}>
        {/* <div
          className="cursor-pointer w-fit p-2"
         
          >
        </div> */}

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
