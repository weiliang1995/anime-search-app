import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className=" text-white p-4 bg-transparent z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">YoPrint Anime Finder</h1>
        <Link
          to="/"
          className="hover:text-blue-200 transition-colors cursor-pointer"
        >
          Home
        </Link>
      </div>
    </header>
  );
};
