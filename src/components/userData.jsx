import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogoutConfirmation, setIsLogoutConfirmation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutConfirmation(false);
    setOpenMenu(false);
    navigate("/login");
  };

  return (
    <div className="relative flex justify-center items-center">
      {loading && (
        <div className="w-6 h-6 border-[3px] border-secondary border-b-transparent rounded-full animate-spin"></div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutConfirmation && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]" />

          <div className="fixed z-[130] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          bg-white rounded-xl shadow-2xl w-[90%] max-w-[360px] p-6 text-center">

            <p className="text-secondary text-lg font-medium">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsLogoutConfirmation(false)}
                className="px-5 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Logged-in UI */}
      {!loading && user && (
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center cursor-pointer px-3 py-2 rounded-full hover:bg-primary transition"
        >
          <img
            src={"/user.png"}
            alt="profile"
            className="h-[30px] w-[30px] rounded-full border-2 border-accent object-cover"
          />
          <span className="ml-2 font-normal text-secondary">
            {user.lastname}
          </span>

          {/* Dropdown */}
          {openMenu && (
            <div
              className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-44 border z-[150]"
              onClick={(e) => e.stopPropagation()} // prevent auto-close
            >
              <a
                href="/account"
                className="block px-4 py-2 hover:bg-primary text-secondary"
              >
                Account Settings
              </a>
              <a
                href="/orders"
                className="block px-4 py-2 hover:bg-primary text-secondary"
              >
                Orders
              </a>
              <button
                onClick={() => setIsLogoutConfirmation(true)}
                className="w-full text-left px-4 py-2 hover:bg-primary text-accent font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Not logged in */}
      {!loading && !user && (
        <a
          href="/login"
          className="bg-accent px-5 py-2 rounded-lg text-white font-medium hover:bg-secondary transition"
        >
          Login
        </a>
      )}
    </div>
  );
}
