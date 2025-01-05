import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  //   for error
  const [error, setError] = useState("");
  const [usermail, setUsermail] = useState("");

  //   handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    // set usermail for forgot password
    setUsermail(email);

    setError(""); // make default error
    // auth login
    loginUser(email, password)
      .then((result) => {
        location.state ? navigate(location.state) : navigate("/");
        toast.success("Welcome back!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Invalid credentials. Please try again.");
      });
  };

  //   handle login with google
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        location.state ? navigate(location.state) : navigate("/");
        toast.success("Welcome back!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Invalid credentials. Please try again.");
      });
  };
  return (
    <div className="flex items-center justify-center  min-h-[calc(100vh-80px)]  ">
      <div className="w-full border max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setUsermail(e.target.value)}
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none "
            />
          </div>
          <div className="flex items-center justify-end">
            <Link
              to="/auth/forgot-password"
              state={{ email: usermail }}
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          {error && (
            <span className="text-sm font-medium text-red-600">{error}</span>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg  font-semibold"
          >
            LOG IN
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?
          </span>
          <Link
            to="/register"
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg shadow-md hover:bg-gray-100"
          >
            <FcGoogle className="mr-2 text-lg" />
            Continue with Google
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          By signing in, you agree to our{" "}
          <Link to="/" className="text-emerald-600 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/" className="text-emerald-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
