
import { AiOutlineClockCircle, AiOutlineDollar } from "react-icons/ai";
import { FaPassport } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";


const MyVisaCard = ({ visa, visas, setVisas, handleUpdate }) => {
  // handle Delete
  // console.log(visa)
  const handleDelete = (id) => {
    // console.log("delete", id);
    fetch(`https://visa-server-zeta.vercel.app/myvisa/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data)
        if (data.deletedCount) {
          // show success
          Swal.fire({
            title: "Deleted!",
            text: "Visa successfuly removed!",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });

          // update ui
          const filterVisas = visas.filter((visa) => visa._id !== id);
          setVisas(filterVisas);
        } else {
          Swal.fire({
            title: "Opps!",
            text: "There is an issu!",
            icon: "error",
          });
        }
      });
  };



  // console.log(curVisa);
  return (
    <div>
      <div className="card bg-base-200 shadow-lg rounded-lg p-4 relative">
        {/* Country Image */}
        <div className="w-full h-40 rounded-md overflow-hidden mb-4">
          <img
            src={visa?.countryimg}
            alt={visa?.country}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Visa Details */}
        <h2 className="text-lg font-bold mb-2">{visa?.country}</h2>
        <p className="text-sm flex items-center mb-2">
          <FaPassport className="mr-2 text-blue-500" />
          Visa Type: {visa?.visatype}
        </p>
        <p className="text-sm flex items-center mb-2">
          <AiOutlineClockCircle className="mr-2 text-green-500" />
          Processing Time: {visa?.processingtime}
        </p>
        <p className="text-sm flex items-center mb-2">
          <AiOutlineDollar className="mr-2 text-yellow-500" />
          Fee: ${visa?.visafee}
        </p>
        <p className="text-sm flex items-center mb-4">
          <span className="mr-2 font-semibold">Validity:</span>
          {visa?.formattedDate}
        </p>
        <p className="text-sm flex items-center mb-4">
          <span className="mr-2 font-semibold">Application Method:</span>
          {visa?.applicationmethod}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            className="btn bg-emerald-400 text-black btn-sm flex items-center space-x-1"
            onClick={() => handleUpdate(visa?._id)}
          >
            <FiEdit />
            <span>Update</span>
          </button>
          <button
            className="btn btn-error btn-sm flex items-center space-x-1"
            onClick={() => handleDelete(visa?._id)}
          >
            <FiTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* modal form */}
      
    </div>
  );
};

export default MyVisaCard;
