import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const VisaDetails = () => {
  const visa = useLoaderData();
  const { user } = useContext(AuthContext); // Get logged-in user's email
  // console.log(visa);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.displayName || "",
    lastName: "",
    appliedDate: new Date().toLocaleDateString("en-CA"), // Current date
    fee: visa.visafee || "",
    // ...visa,
    visaInfo: visa,
  });

  //   handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //   handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data",formData);
    fetch("https://visa-server-zeta.vercel.app/visa/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Congratulatoin!",
            text: "You apllication is processing !",
            icon: "success",
          });
          // modal close
          setIsModalOpen(false);
        } else {
          Swal.fire({
            title: "Error!",
            text: "You apllication is Faild !",
            icon: "error",
          });
        }
      });
  };
  return (
    <div>
      <section className="p-6 bg-base-100">
        {/* Visa Title */}
        <h1 className="text-3xl font-bold text-center mb-6">{visa.country}</h1>

        {/* Visa Details Card */}
        <div className="card bg-base-300 shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
          {/* Country Image */}
          <div className="w-full h-60 md:h-96 rounded-md overflow-hidden mb-6">
            <img
              src={visa.countryimg}
              alt={visa.country}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Visa Details Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p>
                <strong className="font-semibold">Visa Type:</strong>{" "}
                {visa.visatype}
              </p>
              <p>
                <strong className="font-semibold">Processing Time:</strong>{" "}
                {visa.processingtime}
              </p>
              <p>
                <strong className="font-semibold">Fee:</strong> ${visa.visafee}
              </p>
              <p>
                <strong className="font-semibold">Age Restriction:</strong>{" "}
                {visa.age}
              </p>
            </div>

            <div className="space-y-4">
              <p>
                <strong className="font-semibold">Application Method:</strong>{" "}
                {visa.applicationmethod}
              </p>
              <p>
                <strong className="font-semibold">Description:</strong>{" "}
                {visa.description}
              </p>
              <p>
                <strong className="font-semibold">Validity:</strong>{" "}
                {visa.formattedDate}
              </p>
              <p>
                <strong className="font-semibold">Created At:</strong>{" "}
                {new Date(visa.createdAt).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* Apply for Visa Button */}
          <div className="flex justify-center mt-6">
            <button
              className="btn btn-primary btn-wide"
              onClick={() => setIsModalOpen(true)}
            >
              Apply for the Visa
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Apply for Visa</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-200"
                />
              </div>

              <div>
                <label className="label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* last row */}
              <section className="flex justify-between">
                {/* Applied Date */}
                <div className="w-2/5">
                  <label className="label">Applied Date</label>
                  <input
                    type="text"
                    name="appliedDate"
                    value={formData.appliedDate}
                    readOnly
                    className="input input-bordered w-full bg-gray-200"
                  />
                </div>

                {/* Fee */}
                <div className="w-2/5">
                  <label className="label">Fee</label>
                  <input
                    type="text"
                    name="fee"
                    value={formData.fee}
                    readOnly
                    className="input input-bordered w-full bg-gray-200"
                  />
                </div>
              </section>
              {/* Apply Button */}
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-success"
                  // onClick={() => setIsModalOpen(false)}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
