import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-screen h-screen justify-center items-center text-center">
      <div className="bg-amber-50 p-24 m-24 rounded-lg text-2xl">
        <p className="mb-12">404 - Not Found</p>
        <p>Redirecting to home page</p>
        <p className="mb-12">or click the button below...</p>
        <Link to="/">
          <span className="text-xl font-bold hover:text-gray-300">Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
