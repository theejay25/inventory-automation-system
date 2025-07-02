import { FaX } from "react-icons/fa6";
import { useMenuStore } from "../../store/menuStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

//icons
import { MdOutlineDashboard, MdAdd } from "react-icons/md"
import { LuClipboardList, LuClipboardPaste } from "react-icons/lu";
import { AiOutlineStock } from "react-icons/ai";

type props = {
    classname?: string;
}


function SideMenu({classname}: props) {
    
    const {close, isOpen} = useMenuStore()

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
                <ul className={`${ isOpen ? "ul-div" : '' } `}>
                    <li className="sidemenu-list"><MdOutlineDashboard className='inline mr-2 lg:mr-3' /> Dashboard</li>
                    <li className="sidemenu-list"><MdAdd className='inline mr-2 lg:mr-3' />Add Products</li>
                    <li className="sidemenu-list"><LuClipboardList className='inline mr-2 lg:mr-3' />Products</li>
                    <li className="sidemenu-list"><AiOutlineStock  className='inline mr-2 lg:mr-3' />Stock Logs</li>
                    <li className="sidemenu-list"><LuClipboardPaste className='inline mr-2 lg:mr-3' />Sales</li>
                </ul>
            </div>

            <button onClick={handleClick} className="logout-btn">Logout</button>

            </div>

        </div>
    </>
  )
}

export default SideMenu