import React from "react";
import { AiOutlineClockCircle, AiOutlineDollar } from "react-icons/ai";
import { FaPassport } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const ApplicationCard = ({ application, handleCancel }) => {
  const { _id, email, firstName, lastName, appliedDate, visaInfo } =
    application || {};

  //   console.log(visaInfo);
 

  return (
    <>
      <div className="card bg-base-200 shadow-lg rounded-lg p-4 relative">
        {/* Country Image */}
        <div className="w-full h-44 md:h-60 rounded-md overflow-hidden mb-4">
          <img
            src={visaInfo?.countryimg}
            alt={visaInfo?.country}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Visa Details */}
        <h2 className="text-lg font-bold mb-2">{visaInfo?.country}</h2>
        <p className="text-md flex items-center mb-2">
          <FaPassport className="mr-2 text-blue-500" />
          Visa Type: {visaInfo?.visatype}
        </p>
        <p className="text-md flex items-center mb-2">
          <AiOutlineClockCircle className="mr-2 text-green-500" />
          Processing Time: {visaInfo?.processingtime}
        </p>
        <p className="text-md flex items-center mb-2">
          <AiOutlineDollar className="mr-2 text-yellow-500" />
          Fee: ${visaInfo?.visafee}
        </p>
        <p className="text-md flex items-center mb-2">
          <span className="mr-2 font-semibold">Validity:</span>
          {visaInfo?.formattedDate}
        </p>
        <p className="text-md flex items-center mb-2">
          <span className="mr-2 font-semibold">Application Method:</span>
          {visaInfo?.applicationmethod}
        </p>
        <p className="text-md flex items-center mb-2">
          <span className="mr-2 font-semibold">Applied Date:</span>
          {appliedDate}
        </p>
        <p className="text-md flex items-center mb-2">
          <span className="mr-2 font-semibold">Applicant Name:</span>
          {firstName} {lastName}
        </p>
        <p className="text-md flex items-center mb-4">
          <span className="mr-2 font-semibold">Applicant Email:</span>
          {email}
        </p>

        {/* Cancel Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleCancel(_id)}
            className="btn btn-error  flex items-center space-x-1"
          >
            <MdOutlineCancel />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* <div>
        card
    </div> */}
    </>
  );
};

export default ApplicationCard;
