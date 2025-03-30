import { useState } from 'react';
import { X } from 'lucide-react';

const Banner = () => { 
  const [showNotification, setShowNotification] = useState(true);

  return (
    <>
      {showNotification && (
        <div className="bg-pricingGreen text-sm font-bold text-pryGreen border border-green-200 py-3 px-3 rounded-lg- mb-6 flex justify-between items-center">
          <p className="text-center flex-grow">
            You had Amala & Ewedus for lunch yesterday - craving it again?
          </p>
          <X
            className="text-pryGreen- cursor-pointer"
            onClick={() => setShowNotification(false)}
          />
        </div>
      )}
    </>
  );
};

export default Banner;