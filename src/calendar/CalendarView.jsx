// CalendarView.jsx
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import "./CalendarView.css"; // Additional custom styles if needed
import { ArrowLeft, ArrowRight } from "lucide-react"; // Assuming Lucide icons

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current month
  const weeksToShow = 5; // Number of weeks to display per month view

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

    gapi.load("client:auth2", initClient);
  }, [currentDate]); // Reload events when the month changes

  const loadCalendarEvents = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).toISOString();
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).toISOString();

    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: startOfMonth,
        timeMax: endOfMonth,
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        setEvents(events);
      });
  };

  const renderEvents = (day) => {
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate.toLocaleDateString() === day.toLocaleDateString();
    });

    return dayEvents.map((event) => {
      const startTime = event.start.dateTime
        ? new Date(event.start.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "All Day";
      const endTime = event.end.dateTime
        ? new Date(event.end.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      return (
        <div key={event.id} className="event">
          <p className="event-title">{event.summary}</p>
          <p className="event-time">
            {startTime} - {endTime}
          </p>
        </div>
      );
    });
  };

  const renderDays = () => {
    const startOfCalendar = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    startOfCalendar.setDate(
      startOfCalendar.getDate() - startOfCalendar.getDay()
    ); // Start on Sunday

    const days = [];
    let lastMonth = startOfCalendar.getMonth();

    for (let week = 0; week < weeksToShow; week++) {
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startOfCalendar);
        currentDate.setDate(startOfCalendar.getDate() + week * 7 + day);

        // Check if we are in a new month
        const currentMonth = currentDate.getMonth();
        if (currentMonth !== lastMonth) {
          days.push(
            <div
              key={`month-${currentMonth}`}
              className="month-header text-2xl font-bold text-center text-white bg-blue-600 py-2 rounded-md my-4"
            >
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
          );
          lastMonth = currentMonth;
        }

        days.push(
          <div
            key={currentDate.toISOString()}
            className="day-column bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="day-header text-center font-semibold">
              {currentDate.toLocaleDateString("en-US", { weekday: "short" })}
              <span className="block text-gray-500">
                {currentDate.getDate()}
              </span>
            </h3>
            <div className="events-container mt-2">
              {renderEvents(currentDate)}
            </div>
          </div>
        );
      }
    }

    return days;
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="calendar-view p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="calendar-title text-3xl font-extrabold text-center mb-8 text-gray-800">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowRight size={24} />
        </button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-4">{renderDays()}</div>
    </div>
  );
};

export default CalendarView;
