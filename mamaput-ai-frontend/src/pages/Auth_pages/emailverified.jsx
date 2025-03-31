import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import verifiedGif from "../../images/authpages/verified.gif";

const EmailVerifiedScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {/* GIF */}
        <div className="mb-8 flex justify-center items-center">
          <img
            src={verifiedGif}
            alt="Verification Success"
            className="w-32 h-32"
          />
        </div>

        {/* Text Content */}
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          Your email address has been verified.
        </h2>
        <p className="text-gray-600 mb-6">
          The verified email address is now linked to your MamaPut AI account.
          Click the button below to set up your personalized nutrition journey.
        </p>

        {/* Continue Button - Opens Modal */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Continue
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h3 className="text-lg font-semibold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's personalize your nutrition journey.
            </p>

            <div className="flex justify-center space-x-4">
              {/* Cancel Button - Closes Modal */}
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              {/* Proceed Button - Navigates to /onboarding */}
              <button
                className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md"
                onClick={() => navigate("/onboarding")}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerifiedScreen;
