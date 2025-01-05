import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AddVisa = () => {
  const { user } = useContext(AuthContext);

  const documentOptions = [
    "Valid passport",
    "Visa application form",
    "Recent passport-sized photograph",
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    setSelectedDocuments((previousDocuments) => {
      if (isChecked) {
        return [...previousDocuments, value];
      } else {
        return previousDocuments.filter((doc) => doc !== value);
      }
    });
  };
  // handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

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

    // formData
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
      createdAt: new Date().toISOString(),
      useremail: user?.email,
    };

    // console.log(formData);
    // send to the server
    fetch("https://visa-server-zeta.vercel.app/visas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        {
          if (data.acknowledged) {
            Swal.fire({
              title: "Well Done!",
              text: "Your Visa have Created Successfully!",
              icon: "success",
            });
            //
            form.reset();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Your Visa have Created Failed!",
              icon: "error",
            });
          }
        }
      });
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Your Visa</h1>
      <form
        className="md:grid md:grid-cols-2  gap-6 bg-base-300 p-6 shadow-lg rounded-lg md:w-10/12 mx-auto"
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
            // value={formData.countryImage}
            // onChange={handleInputChange}
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
            // value={formData.countryName}
            // onChange={handleInputChange}
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
            // value={formData.visaType}
            // onChange={handleInputChange}
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
            // value={formData.processingTime}
            // onChange={handleInputChange}
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
            // value={formData.description}
            // onChange={handleInputChange}
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
            // value={formData.ageRestriction}
            // onChange={handleInputChange}
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
            defaultValue="6000"
            // value={formData.fee}
            // onChange={handleInputChange}
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
            defaultValue={"Online"}
            // value={formData.applicationMethod}
            // onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-4">
          <button className="btn bg-teal-500 w-full">Add Visa</button>
        </div>
      </form>
    </div>
  );
};

export default AddVisa;
