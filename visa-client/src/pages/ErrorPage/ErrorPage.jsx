import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center">
    <h2 className="text-4xl font-bold text-error mb-4">Error 404</h2>
    <p className="text-lg text-gray-600 mb-6">The page you are looking for doesnt exist or an error occurred.</p>
    <button
      onClick={() => navigate(-1)}
      className="btn btn-primary px-6 py-3 text-lg"
    >
      Go Back
    </button>
  </div>
  );
};

export default ErrorPage;
