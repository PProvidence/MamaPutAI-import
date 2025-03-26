import { useDispatch, useSelector } from 'react-redux';
import { toggleCategoryEnabled, toggleNotificationSetting } from '../../../redux/userSettingsSlice';

const NotificationSettings = () => {
    const dispatch = useDispatch();
    const notificationSettings = useSelector((state) => state.userSettings.notificationSettings);

    const categories = Object.keys(notificationSettings).filter(key => typeof notificationSettings[key] === 'object');

    return (
        <div>
            <h2 className="heading--settings">Notification Settings</h2>

            {categories.map((category) => (
                <div key={category} className="notification-category">
                    {/* Category Header */}
                    <div className="category-header">
                        <h3 className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        <button 
                            onClick={() => dispatch(toggleCategoryEnabled(category))}
                            className={`toggle-btn ${notificationSettings[category + 'Enabled'] ? 'active' : ''}`}
                        >
                            {notificationSettings[category + 'Enabled'] ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    {/* Individual Settings */}
                    {Object.keys(notificationSettings[category]).map((setting) => (
                        <div key={setting} className="checkbox-item">
                            <input 
                                type="checkbox"
                                checked={notificationSettings[category][setting]}
                                onChange={() => dispatch(toggleNotificationSetting({ category, setting }))}
                            />
                            <label>{setting.replace(/([A-Z])/g, ' $1').trim()}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default NotificationSettings;
