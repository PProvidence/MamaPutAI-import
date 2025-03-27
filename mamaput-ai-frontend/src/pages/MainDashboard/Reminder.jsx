import { ChevronLeft, PlusIcon} from 'lucide-react';
import { BiSolidCalendarX } from "react-icons/bi";


const Reminders = () => {

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="p-6 w-full font-instrument-sans flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
                <div className='flex items-center mb-6'>
                    <ChevronLeft className="mr-4 cursor-pointer hover:text-pryGreen"  onClick={handleGoBack} />
                    <h1 className="text-2xl font-bold">Reminders</h1>
                </div>
                <div>
                    <button className="bg-pryGreen text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition">
                    <PlusIcon className="w-5 h-5" />
                    <span>Create reminder</span>
                    </button>
                </div>
            </div>
            
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center max-w-5/12">
            <BiSolidCalendarX className="w-12 h-12 text-pryGreen mb-4" />
            <h2 className="text-xl font-bold mb-2">You have no reminders yet</h2>
            <p className="text-gray-600 mb-4">Set reminders to receive alerts about meal time, planned calendar activities, water time etc.</p>
        </div>
        </div>
    );
};

export default Reminders;