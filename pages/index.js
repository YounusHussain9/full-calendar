import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import page from './full-calendar'
import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const events = [
    {
      id: 1,
      title: "Relief Officer",
      start: "2023-09-14T08:00:00",
      end: "2023-09-14T18:30:00",
      backgroundColor: "red",
      allDay: false,
      description: "Event description goes here.",
      location: "London",
    },
    {
      id: 2,
      title: "Security Head",
      start: "2023-09-14T08:00:00",
      end: "2023-09-14T18:30:00",
      backgroundColor: "blue",
      allDay: false,
      description: "Event description goes here.",
      location: "Lead",
    },
    {
      id: 3,
      title: "Door Supervisor",
      start: "2023-09-14T08:00:00",
      end: "2023-09-14T18:30:00",
      backgroundColor: "green",
      allDay: false,
      description: "Event description goes here.",
      location: "Belgium",
    },
    {
      id: 4,
      title: "Door Man",
      start: "2023-09-14T08:00:00",
      end: "2023-09-14T18:30:00",
      backgroundColor: "yellow",
      allDay: false,
      description: "Event description goes here.",
      location: "New York",
    },
  ];

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const eventRef = useRef(null);

  const handleEventMouseEnter = (arg) => {
    setHoveredEvent(arg.event);

    setTimeout(() => {
      console.log("Delayed for 1 second.");
      eventRef.current = arg.el; // Store the event's DOM element in the ref
    }, "2000");
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
    setTimeout(() => {
      eventRef.current = null; // Clear the event's DOM element from the ref
      console.log("Delayed for 1 second.");
    }, "2000");
  };

  const getEventPosition = () => {
    if (eventRef.current) {
      const rect = eventRef.current.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    }
    return null;
  };

  return (
    <main>
      <page />
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"90vh"}
          events={events}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
        />
        {hoveredEvent && (
          <div className="event-tooltip" style={getEventPosition()}>
            <h3>{hoveredEvent.title}</h3>
            <p>{hoveredEvent.startStr}</p>
          </div>
        )}
      </div>
    </main>
  );
}
