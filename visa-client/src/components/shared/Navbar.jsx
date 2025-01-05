import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // ------------ handle logout-----------
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Goodbye! See you soon!");
      })
      .catch();
  };

  // handle Hover
  const [isHovered, setIsHovered] = useState(false);
  
  // Toogle Theme
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // -------------all_navlinks-----------
  const navLinks = (
    <div className="flex flex-col lg:flex-row gap-5 font-medium">
      <NavLink
        className={({ isActive }) =>
          isActive ? "font-bold text-emerald-500" : ""
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "font-bold text-emerald-500" : ""
        }
        to="/allvisas"
      >
        All Visas
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "font-bold text-emerald-500" : ""
        }
        to="/addvisa"
      >
        Add Visa
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "font-bold text-emerald-500" : ""
        }
        to="/myvisas"
      >
        My added visas
      </NavLink>
      {user && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-emerald-500" : ""
          }
          to="/visa-application"
        >
          Application
        </NavLink>
      )}
    </div>
  );

  return (
    <div>
      <div className="navbar bg-base-200 container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown z-10">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-xl font-extrabold md:ml-6 ">VisaEa&e</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end mr-4 md:mr-8">
          {user ? (
            <section className="flex gap-3  items-center ">
              {/* <div className="avatar placeholder border-2 rounded-full cursor-pointer hover:">
                <div className="avatar">
                  <div className="w-11 rounded-full">
                    <img
                      src={user?.photoURL}
                      alt="profile-pic"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div> */}

              <button className=" btn-primary" onClick={toggleTheme}>
              <input type="checkbox" value="synthwave" className="toggle theme-controller" />
              </button>

              <div
                className="relative "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Avatar */}
                <div className="avatar placeholder border-2 rounded-full ">
                  <div className="w-11 rounded-full">
                    <img
                      src={user?.photoURL}
                      alt="profile-pic"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Hover Content */}
                {isHovered && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md p-3 text-center z-10 w-28  ">
                    {/* Display Name */}
                    <p className="text-sm text-gray-800 font-semibold">
                      {user?.displayName || "User"}
                    </p>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="mt-2 px-4 py-1 bg-emerald-500 text-white text-sm font-semibold rounded hover:bg-emerald-600 focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-3 bg-emerald-500 text-white font-medium rounded-md  py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 bg-emerald-500 text-white font-medium rounded-md  py-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
