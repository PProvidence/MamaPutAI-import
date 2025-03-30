import   { useState } from 'react';
import { X } from 'lucide-react';
import formatDate from '../../utils/dateUtil';

const NotificationsPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '🎊 Hurray John!!',
      message: 'You just created your first meal plan.',
      date: new Date(), // Today
      read: false,
    },
    {
      id: 2,
      title: '',
      message: 'You turned off push notifications.',
      date: new Date('2025-03-27'), // Yesterday
      read: false,
    },
    {
      id: 3,
      title: '✨ New Feature',
      message: 'Check out our new meal planning tool.',
      date: new Date('2025-03-23'), // Last week
      read: false,
    },
    {
      id: 4,
      title: '🔔 Reminder',
      message: 'Don\'t forget to eat your meals.',
      date: new Date('2025-03-29'), // 2 days ago
      read: false,
    },
  ]);

  // Function to get category based on date
  const getCategory = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const notifDate = new Date(date);
    notifDate.setHours(0, 0, 0, 0);

    if (notifDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (notifDate.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else if (notifDate >= lastWeekStart && notifDate < yesterday) {
      return 'Last Week';
    } else {
      return 'Older';
    }
  };

    // Define the desired order of categories
    const categoryOrder = ['Today', 'Yesterday', 'Last Week', 'Older'];

    // Group notifications by category and sort within each category
    const getGroupedNotifications = () => {
        const result = {};

        notifications.forEach(notification => {
            const category = getCategory(notification.date);
            if (!result[category]) {
                result[category] = [];
            }
            result[category].push(notification);
        });

        // Sort notifications within each category by date (descending order)
        for (const category in result) {
            result[category].sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        // Ensure all categories exist, even if empty
        categoryOrder.forEach(category => {
            if (!result[category]) {
                result[category] = [];
            }
        });
        return result;
    };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const dismissBanner = () => {
    setShowBanner(false);
  };

  // Get filtered notifications based on active tab
    const filteredGroupedNotifications = () => {
        const grouped = getGroupedNotifications();
        if (activeTab === 'All') {
            return grouped;
        } else {
            const result = {};
            for (const category in grouped) {
                const unread = grouped[category].filter(n => !n.read);
                if (unread.length > 0) {
                    result[category] = unread;
                }
            }
            return result;
        }
    };

  const groupedNotifications = filteredGroupedNotifications();
  const hasNotifications = Object.values(groupedNotifications).some(arr => arr.length > 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {showBanner && (
        <div className="bg-green-100 p-4 mb-6 rounded-lg text-sm flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">🔔</span>
            <span>Turn on push notifications when you need to be reminded of alerts, messages, updates</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-white px-4 py-2 rounded-full text-sm border border-green-200 cursor-pointer"
            >
              Allow push notifications
            </button>
            <button
              className="text-sm font-medium cursor-pointer"
              onClick={dismissBanner}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-6">
          <button
            className={`pb-2 ${activeTab === 'All' ? 'border-b-2 border-green-500 font-medium' : 'text-gray-500'} cursor-pointer`}
            onClick={() => setActiveTab('All')}
          >
            All
          </button>
          <button
            className={`pb-2 ${activeTab === 'Unread' ? 'border-b-2 border-green-500 font-medium' : 'text-gray-500'} cursor-pointer`}
            onClick={() => setActiveTab('Unread')}
          >
            Unread
          </button>
        </div>
        <button
          className="flex items-center text-sm border border-gray-200 px-3 py-1 rounded cursor-pointer"
          onClick={markAllAsRead}
        >
          Mark all as read <span className="ml-2">✓✓</span>
        </button>
      </div>

      {hasNotifications ? (
        <div className="space-y-6">
          {categoryOrder.map(category => {
            const categoryNotifications = groupedNotifications[category];
            if (!categoryNotifications || categoryNotifications.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="text-sm text-gray-500 mb-2">{category}</h2>
                <div className="space-y-4">
                  {categoryNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className="border-b pb-4 relative cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          {notification.read ? (
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          {notification.title && <div className="font-medium">{notification.title}</div>}
                          <div>{notification.message}</div>
                          <div className="text-sm text-gray-500 mt-1">{formatDate(notification.date, 'dd MMMM, yyyy')}</div>
                        </div>
                        <button
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No notifications to display
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
