import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import MyVisaCard from "../../components/MyVisaCard";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const MyVisas = () => {
  //   const visas = useLoaderData();
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [curVisa, setCurVisa] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://visa-server-zeta.vercel.app/myvisa?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setVisas(data)
      });
  }, [user.email]);

  //  ------------------------- Form Data update

  const documentOptions = [
    "Valid passport",
    "Visa application form",
    "Recent passport-sized photograph",
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedDocuments([...selectedDocuments, value]); // Add the document
    } else {
      setSelectedDocuments(selectedDocuments.filter((doc) => doc !== value)); // Remove the document
    }
  };

  // update button// Update button

  const handleUpdate = (id) => {
    // console.log("Updating visa with ID:", id);

    // Fetch the visa by ID
    fetch(`https://visa-server-zeta.vercel.app/visa/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurVisa(data);
        // console.log("Data", data);
        // Show the modal
        setTimeout(() => {
          document.getElementById("my_modal_4").showModal();
        }, 200);
      });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Extract form values
    const countryimg = form.countryImage.value;
    const country = form.countryName.value;
    const visatype = form.visaType.value;
    const processingtime = form.processingTime.value;
    const description = form.description.value;
    const age = form.age.value;
    const visafee = form.fee.value;
    const formattedDate = startDate.toLocaleDateString("en-CA");
    const applicationmethod = form.applicationMethod.value;
    const reqdocs = selectedDocuments;

    // Create the form data object
    const formData = {
      countryimg,
      country,
      visatype,
      processingtime,
      description,
      age,
      visafee,
      formattedDate,
      applicationmethod,
      reqdocs,
      createdAt: curVisa.createdAt,
      useremail: user?.email,
    };

    // SEND TO THE SERVER
    // console.log("Form Data to be submitted:", formData, curVisa._id);
    fetch(`https://visa-server-zeta.vercel.app/myvisa/${curVisa._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Re-fetch all visas
        fetch(`https://visa-server-zeta.vercel.app/myvisa?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => setVisas(data));
        // Close the modal
        const modal = document.getElementById("my_modal_4");
        modal.close();
        // show
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Update Done!",
            text: "Successfuly Update Visa!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Not Update !",
            text: "Fail to Update Visa!",
            icon: "error",
          });
        }
      });
  };

  // for loading data
  if (loading)
    return (
      <div className=" flex items-center justify-center min-h-[80vh]">
        <span className="loading loading-ring loading-lg text-emerald-500"></span>
      </div>
    );

  return (
    <section className="p-6 bg-base-100">
      <h1 className="text-3xl font-bold text-center mb-8">My Added Visas</h1>

      {/* Visa Cards Grid */}

      {visas.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {visas.map((visa, index) => (
              <MyVisaCard
                key={index}
                visa={visa}
                visas={visas}
                setVisas={setVisas}
                handleUpdate={handleUpdate}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="h-40 flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-center my-4 text-red-400 ">
            There is No Visa Available !
          </h2>
        </div>
      )}

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between items-center mx-">
            <h3 className="font-bold text-lg text-center  ">Update Form</h3>
            <div className="modal-action mt-0 ">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">X</button>
              </form>
            </div>
          </div>
          <form
            className="md:grid md:grid-cols-2  gap-6 bg-base-200 p-6 shadow-lg rounded-lg md:w-10/12 mx-auto"
            onSubmit={handleSubmit}
          >
            {/* Country Image */}
            <div>
              <label className="label">Country Image URL</label>
              <input
                type="text"
                name="countryImage"
                placeholder="Enter Image URL"
                className="input input-bordered w-full"
                defaultValue={curVisa?.countryimg}
                required
              />
            </div>

            {/* Country Name */}
            <div>
              <label className="label">Country Name</label>
              <input
                type="text"
                name="countryName"
                placeholder="Enter Country Name"
                className="input input-bordered w-full"
                defaultValue={curVisa?.country}
                required
              />
            </div>

            {/* Visa Type */}
            <div>
              <label className="label">Visa Type</label>
              <select
                name="visaType"
                className="select select-bordered w-full"
                style={{ maxWidth: "100%" }}
                defaultValue={curVisa?.visatype}
                required
              >
                <option value="" disabled>
                  Select Visa Type
                </option>

                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Official Visa">Official Visa</option>
              </select>
            </div>

            {/* Processing Time */}
            <div>
              <label className="label">Processing Time</label>
              <input
                type="text"
                name="processingTime"
                placeholder="Enter Processing Time (e.g., 10 days)"
                className="input input-bordered w-full"
                defaultValue={curVisa?.processingtime}
                required
              />
            </div>

            {/* required Documents */}
            <div className="col-span-2">
              <label className="label">required Documents</label>
              <div className="flex flex-wrap gap-4">
                {documentOptions.map((doc, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={doc}
                      onChange={handleCheckboxChange}
                      checked={selectedDocuments.includes(doc)}
                      className="checkbox"
                      // defaultValue={}
                    />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="label">Description</label>
              <textarea
                name="description"
                placeholder="Enter Description"
                className="textarea textarea-bordered w-full"
                defaultValue={curVisa?.description}
                required
              />
            </div>

            {/* Age Restriction */}
            <div>
              <label className="label">Age Restrication</label>
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                className="input input-bordered w-full"
                defaultValue={curVisa?.age}
              />
            </div>

            {/* Fee */}
            <div>
              <label className="label">Fee</label>
              <input
                type="number"
                name="fee"
                placeholder="Enter Fee"
                className="input input-bordered w-full"
                defaultValue={curVisa?.visafee}
                required
              />
            </div>

            {/* Validity */}
            <div>
              <label className="label ">Validity</label>
              <div className="w-full">
                <DatePicker
                  className="border-2 p-2 rounded-md w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  // defaultValue={curVisa.formattedDate}
                />
              </div>
            </div>

            {/* Application Method */}
            <div>
              <label className="label">Application Method</label>
              <input
                type="text"
                name="applicationMethod"
                placeholder="Enter Application Method"
                className="input input-bordered w-full"
                defaultValue={curVisa?.applicationmethod}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4">
              <button className="btn bg-teal-500 w-full">Update </button>
            </div>
          </form>
          {/* <p className="py-4">Click the button below to close</p> */}
        </div>
      </dialog>
    </section>
  );
};

export default MyVisas;
