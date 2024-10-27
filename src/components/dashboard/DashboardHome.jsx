import { Bell, Calendar, Clock, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const DashboardHome = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [todaysEvents, setTodaysEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const stats = [
    {
      name: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      name: "Today's Events",
      value: todaysEvents,
      icon: Clock,
      color: "bg-green-500",
    },
    {
      name: "Total Participants",
      value: 45,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      name: "Pending Notifications",
      value: 5,
      icon: Bell,
      color: "bg-yellow-500",
    },
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
            authInstance.signIn().then(() => {
              loadCalendarEvents();
            });
          } else {
            loadCalendarEvents();
          }
        });
    };

    const loadCalendarEvents = () => {
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          orderBy: "startTime",
        })
        .then((response) => {
          const events = response.result.items;
          setTotalEvents(events.length);

          const today = new Date();
          const todayEvents = events.filter((event) => {
            const eventDate = new Date(
              event.start.dateTime || event.start.date
            );
            return (
              eventDate.getDate() === today.getDate() &&
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear()
            );
          });

          setTodaysEvents(todayEvents.length);
          setUpcomingEvents(todayEvents); // Set today's events in the upcoming events section
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Events */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Today's Events</h2>
          <div className="mt-4 space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {event.summary}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        event.start.dateTime || event.start.date
                      ).toLocaleDateString()}{" "}
                      at{" "}
                      {event.start.dateTime
                        ? new Date(event.start.dateTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "All Day"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No events scheduled for today.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
