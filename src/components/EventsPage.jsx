import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const clientId =
    "85093982175-hp64f6svqj7eo2im2q8ol2gfoc1co20n.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: "AIzaSyBKlNbn4SmthO9H0BwQcsjfm6pbBdER6Hw",
          clientId: clientId,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.readonly",
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          if (!authInstance.isSignedIn.get()) {
            authInstance.signIn().then(fetchEvents);
          } else {
            fetchEvents();
          }
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const fetchEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        maxResults: 2500,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        setEvents(response.result.items);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const renderEvents = () => {
    return events.length === 0 ? (
      <p>No events found.</p>
    ) : (
      <ul className="space-y-4">
        {events.map((event) => {
          const startTime = event.start.dateTime
            ? new Date(event.start.dateTime).toLocaleString()
            : "All Day";
          const endTime = event.end.dateTime
            ? new Date(event.end.dateTime).toLocaleString()
            : "";

          return (
            <li key={event.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">
                {event.summary || "No Title"}
              </h2>
              <p>
                <strong>Start:</strong> {startTime}
              </p>
              <p>
                <strong>End:</strong> {endTime}
              </p>
              {event.location && (
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              )}
              {event.description && (
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              )}
              {event.attendees && (
                <div>
                  <strong>Attendees:</strong>
                  <ul className="list-disc ml-6">
                    {event.attendees.map((attendee, index) => (
                      <li key={index}>{attendee.email}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Your Events</h1>
      {renderEvents()}
    </div>
  );
};

export default EventsPage;
