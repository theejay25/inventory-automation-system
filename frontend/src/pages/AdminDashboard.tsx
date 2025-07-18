//components
import SideMenu from "../components/react/SideMenu";
import ProfileModal from "../components/react/ProfileModal";
import CompassLoader from "../components/react/loaders/CompassLoader";

// icons
import { FaBarsStaggered, FaX } from "react-icons/fa6";

//hooks || react components
import { useMenuStore } from "../store/menuStore";
import { useAuthStore } from "../store/authStore";
import { useState, type ChangeEvent } from "react";
import ToastModal from "../components/react/ToastModal";
import { Outlet } from "react-router-dom";

//images
import ghost from '../assets/img/not ready.jpeg'


function AdminDashboard() {

  const [edit, setEdit] = useState(true);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const { updateUser, formError, isLoading } = useAuthStore();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name.trim()) return; // Don’t send empty names

  const success = await updateUser(name, user.id);

  if (!success) {
    console.log("Update failed:", formError);
  }
};

  const { user } = useAuthStore();

  const { open, isOpen, close } = useMenuStore();

  return (
    <>
      <div className="text-white" onClick={close}>
        <div className="nav-bar">
          {isOpen && (
            <div
              className="w-fit p-3 cursor-pointer h-fit z-40 lg:hidden"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              <FaBarsStaggered size={28} />
            </div>
          )}

          <p className="lg:text-xl font-semibold">Welcome, {user.name?.toUpperCase()}</p>
        </div>
      </div>

      <div className="text-white">
        <SideMenu
          classname={`${
            isOpen ? "side-div left-[-49vw] " : " side-div left-[0] "
          }`}
          onclick={() => setShow(true)}
        />
      </div>

      <div className="main-area">
        <div className="flex justify-center items-center">
          <ToastModal
            classname={`toast-div bg-red-500 ${
              formError ? "top-17 opacity-100" : "top-10 opacity-0"
            }`}
          >
            {formError}
          </ToastModal>
        </div>

        <ProfileModal classname={`profile-modal ${show ? "" : "hidden"}`}>
          <div
            className=" ml-70 p-3 cursor-pointer"
            onClick={() => setShow(false)}
          >
            <FaX />
          </div>
          <div className="flex flex-row justify-center items-end gap-7 border-b-1 pb-7">
            <img
              src={ghost}
              alt="user image"
              className="border-1 size-30 rounded-[100%]"
            />

            <div>
              <p className="text-xl font-semibold mb-1">
                {user.name?.toUpperCase() ?? "Username"}
              </p>
              <p className="mb-4">{user.email ?? "Email"}</p>

              <p
                className="cursor-pointer text-blue-500 ml-23"
                onClick={() => setEdit(!edit)}
              >
                Edit Info
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div
                className={`flex flex-col mt-5 border-b-1 pb-7 ${
                  edit ? "hidden" : ""
                }`}
              >
                <label htmlFor="name" className="block mb-2">
                  Edit Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="username"
                  className="mb-4 rounded-md bg-[#404040] p-3"
                  placeholder="Username"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="bg-[#0A2463] cursor-pointer flex justify-center items-center p-5 text-center text-white"
                >
                  { isLoading ? <CompassLoader /> : "Complete"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 flex justify-center items-center">
            <button className="bg-red-500 cursor-pointer p-5 text-center text-white">
              Delete Account
            </button>
          </div>
        </ProfileModal>
      </div>
      <Outlet />
    </>
  );
}

export default AdminDashboard;
