import { Bell, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import formatDate from '../../utils/dateUtil';

const Header = () => {
  const profilePicture = useSelector((state) => state.userSettings.profileState.profilePicture);
  const name = useSelector((state) => state.userSettings.profileState.name);
  // const currentDate = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, 'dd MMM yyyy');//  Use 'DD MMMM YYYY'

  return (
    <div className="flex justify-between items-center mb-6">
    <div>
      <p className="text-sm font-medium text-gray-600">{formattedDate}</p>
      <h1 className="text-2xl font-bold">Howdy {name ? name.split(' ')[0] : "user"}</h1>
    </div>
    <div className="flex items-center space-x-3">
      <Link to="/dashboard/notifications">
        <div className='bg-amber-4 p-2 rounded-full'>
          <Bell className="w-6 h-6 cursor-pointer" />
        </div>
      </Link>
      <Link to="/settings/account">
        <div className='bg-[#BBF7D0] p-2 rounded-full'>
          <Settings className="w-6 h-6 cursor-pointer" />
        </div>
      </Link>
      <Link to="/settings/profile">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className='bg-[#d9d9d9] p-2 rounded-full'>
            <User className="w-6 h-6 cursor-pointer" />
          </div>
        )}
      </Link>

    </div>
  </div>
  );
};

export default Header;