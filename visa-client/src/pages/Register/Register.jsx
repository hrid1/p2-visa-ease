import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserInfo, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  // for error
  const [error, setError] = useState({});

  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const photourl = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    // console.log(username, photourl, email, password);

    // set error default
    setError({});

    // password authentication

    const passRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passRegex.test(password)) {
      setError({ ...error, password: "Password doesn't meet the criteria!" });
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        updateUserInfo(username, photourl)
          .then(() => {
            navigate("/");
            toast.success("Account created successfully!");
          })
          .catch(() => {
            setError({ ...error, auth: "profile update error" });
            toast.error("Something went wrong!");
          });
      })
      .catch((err) => {
        setError({ ...error, auth: err.message });
      });
  };

  //   handle login with google
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        navigate("/");
        toast.success("Account created successfully!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // handle showhide passwrod
  const [show, setShow] = useState(false);
  const handleShowEye = (show) => {
    setShow(!show);
  };

  return (
    <div className="flex items-center justify-center  min-h-[calc(100vh-80px)]">
      <div className="w-full border max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="mt-4">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              User Name
            </label>
            <input
              name="username"
              type="username"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="photo"
              className="block text-sm font-semibold text-gray-700"
            >
              Photo Url
            </label>
            <input
              name="photo"
              type="link"
              id="photo"
              placeholder="Photo url"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className=" relative ">
              <p
                className=" absolute right-2.5 top-5 cursor-pointer"
                onClick={() => handleShowEye(show)}
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </p>
              <input
                name="password"
                type={show ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none  focus:ring-emerald-400 "
              />
            </div>
          </div>
          {/* for password */}
          {error && (
            <span className="text-sm font-medium text-red-500">
              {error.password}
            </span>
          )}
          {/* for firebase auth */}
          {error && (
            <span className="text-sm font-medium text-red-500">
              {error.auth}
            </span>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg  font-semibold"
          >
            Register
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            Sign In
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

export default Register;
