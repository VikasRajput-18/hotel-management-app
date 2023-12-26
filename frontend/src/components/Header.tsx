import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holdidays.com</Link>
        </span>
        <span className="flex">
          <Link
            to="/sign-in"
            className="bg-white rounded-sm text-blue-600 flex items-center justify-center px-3 font-bold hover:bg-gray-100 "
          >
            Sign In
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
