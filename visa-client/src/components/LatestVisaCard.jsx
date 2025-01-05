import {
  AiOutlineClockCircle,
  AiOutlineDollar,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LatestVisaCard = ({ visa }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card w-full  bg-base-200 shadow-xl ">
        {/* Country Image */}
        <figure>
          <img
            src={visa?.countryimg}
            alt={visa?.country}
            className="h-48 md:h-60 w-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body">
          {/* Country Name */}
          <h2 className="card-title text-lg font-bold">{visa?.country}</h2>

          {/* Visa Type */}
          <p className="text-sm">
            <AiOutlineInfoCircle className="inline-block mr-2" />
            Visa Type: <span className="font-semibold">{visa?.visatype}</span>
          </p>

          {/* Processing Time */}
          <p className="text-sm">
            <AiOutlineClockCircle className="inline-block mr-2" />
            Processing Time:{" "}
            <span className="font-semibold">{visa?.processingtime}</span>
          </p>

          {/* Fee */}
          <p className="text-sm">
            <AiOutlineDollar className="inline-block mr-2" />
            Fee: <span className="font-semibold">${visa?.visafee}</span>
          </p>

          {/* Validity */}
          <p className="text-sm">
            Validity:{" "}
            <span className="font-semibold">{visa?.formattedDate}</span>
          </p>

          {/* Application Method */}
          <p className="text-sm">
            Application Method:{" "}
            <span className="font-semibold">{visa?.applicationmethod}</span>
          </p>

          {/* See Details Button */}
          <div className="card-actions mt-4">
            <button
              className="btn bg-teal-600 text-white w-full"
              onClick={() => navigate(`/visa/${visa._id}`)}
            >
              See Details
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestVisaCard;
