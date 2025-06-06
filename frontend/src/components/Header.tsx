import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-3">
          {!isLoggedIn ? (
            <Link
              to="/sign-in"
              className="bg-white rounded-sm text-blue-600 flex items-center justify-center px-3 font-bold hover:bg-gray-100 "
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                className=" rounded-sm text-white flex items-center justify-center px-3 font-bold hover:bg-blue-500  transition-all duration-200 ease-in-out"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className=" rounded-sm text-white flex items-center justify-center px-3 font-bold hover:bg-blue-500  transition-all duration-200 ease-in-out"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
