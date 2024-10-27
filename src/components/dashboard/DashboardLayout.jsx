import { useAuth0 } from "@auth0/auth0-react";
import {
  Bell,
  Calendar,
  Clock,
  Home,
  LogOut,
  PlusCircle,
  Settings,
  Users,
  Utensils,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";

const DashboardLayout = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const [showMessages, setShowMessages] = useState(false); // State for message pop-up
  const [notifications, setNotifications] = useState([]); // State to store upcoming events notifications
  const [unreadNotifications, setUnreadNotifications] = useState({}); // Track unread status of notifications

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Events", href: "/dashboard/events", icon: Clock },
    { name: "Participants", href: "/dashboard/participants", icon: Users },
    { name: "Meals & Grocery", href: "/dashboard/meals", icon: Utensils },
  ];

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: "AIzaSyBKlNbn4SmthO9H0BwQcsjfm6pbBdER6Hw",
          clientId:
            "85093982175-hp64f6svqj7eo2im2q8ol2gfoc1co20n.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.readonly",
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          if (!authInstance.isSignedIn.get()) {
            authInstance.signIn().then(checkUpcomingEvents);
          } else {
            checkUpcomingEvents();
          }
        });
    };

    gapi.load("client:auth2", initClient);

    // Check for events every 5 minutes
    const intervalId = setInterval(checkUpcomingEvents, 300000); // 300000 ms = 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  const checkUpcomingEvents = () => {
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + 30 * 60000).toISOString(); // 30 minutes from now

    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin,
        timeMax,
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        setNotifications(events);

        // Initialize unread notifications
        const unreadStatus = {};
        events.forEach((event) => {
          unreadStatus[event.id] = true;
        });
        setUnreadNotifications(unreadStatus);
      });
  };

  const handleBellClick = () => {
    setShowMessages(!showMessages); // Toggle the message pop-up
  };

  const markAsRead = (eventId) => {
    setUnreadNotifications((prevState) => ({
      ...prevState,
      [eventId]: false,
    }));
  };

  // Count of unread notifications
  const unreadCount = Object.values(unreadNotifications).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-primary-600">
              Event Automator
            </h1>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {user?.name?.[0] || "U"}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-primary-600"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            <button
              onClick={() => navigate("/dashboard/events/new")}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Navigation */}
        <div className="bg-white shadow relative">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4 relative">
              <button
                onClick={handleBellClick}
                className="p-2 text-gray-400 hover:text-gray-500 relative"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Pop-up */}
              {showMessages && (
                <div className="absolute top-12 right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Upcoming Events
                  </h4>
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No events in the next 30 minutes.
                    </p>
                  ) : (
                    notifications.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => markAsRead(event.id)}
                        className={`mb-2 p-2 rounded-lg cursor-pointer ${
                          unreadNotifications[event.id]
                            ? "bg-red-100"
                            : "bg-white"
                        }`}
                      >
                        <p className="text-sm font-medium">{event.summary}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.start.dateTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}{" "}
                          -{" "}
                          {new Date(event.end.dateTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
