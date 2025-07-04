import { FaX } from "react-icons/fa6";
import { useMenuStore } from "../../store/menuStore";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";



// icons
import { MdOutlineDashboard, MdAdd } from "react-icons/md"
import { LuClipboardList, LuClipboardPaste } from "react-icons/lu";
import { AiOutlineStock } from "react-icons/ai";

type props = {
  classname?: string;
}


function SideMenu({classname}: props) {
  
  const {close, isOpen} = useMenuStore()
  
  const location = useLocation();

     const navigate = useNavigate()
  const { logout, error, message } = useAuthStore()

  const handleClick = async () => {
    await logout()
    if (!error) {
      navigate('/')
    } else {
      console.log(error)
    }
    console.log(message)
  }

const paths = [
  { name: "Dashboard", path: "dashboard", icon: <MdOutlineDashboard /> },
  { name: "Add Products", path: "add-products", icon: <MdAdd /> },
  { name: "Products", path: "products", icon: <LuClipboardList /> },
  { name: "Stock Logs", path: "stock-logs", icon: <AiOutlineStock /> },
  { name: "Sales", path: "sales", icon: <LuClipboardPaste /> },
];


  const params = useParams()

  console.log(params)

    const activeClass = (pathName: string) => {
    const currentPath = location.pathname;

    // Exact match for dashboard
    if (pathName === "dashboard") {
      return currentPath === "/admin-dashboard" || currentPath === "/admin-dashboard/dashboard"
        ? "active"
        : "";
    }

    // Exact match for others
    return currentPath === `/admin-dashboard/${pathName}` ? "active" : "";
  };

  return (
    <>
        <div className={classname}>
            <div 
                className="x-side-div" onClick={close}
            >
                <FaX />
            </div>

            <div className="lg:w-fit lg:ml-15">
            <h1 className="font-semibold text-center tracking-wider text-lg mt-3 lg:ml-15 lg:mt-20 lg:text-3xl lg:tracking-widest">QUICKSHELF</h1>
            <p className="text-center text-lg tracking-wider lg:text-2xl lg:ml-15">Smart inventory</p>

            <div className=" w-full h-[45vh] mt-13 lg:h-[50vh] flex justify-center items-center">
             <ul className={`${isOpen ? "ul-div" : ''}`}>
                {paths.map((item) => (
                   <li key={item.name} className={`sidemenu-list ${activeClass(item.path) ? 'sidemenu-list-active duration-0' : ''}`}>
                    <Link to={`/admin-dashboard/${item.path}`} className="flex flex-row justify-center items-center">
                      <span className="icon">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            <button onClick={handleClick} className="logout-btn">Logout</button>

            </div>

        </div>
    </>
  )
}

export default SideMenu