import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const eventArray = [
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

const Calendar = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState("");
  const [currentView, setCurrentView] = useState('dayGridMonth');

  const [candidateObject, setCandidateObject] = useState({
    id:'',
    title: "",
    startTime: "",
    endTime: "",
    location: "",
  });
  const popoverTargetRef = useRef(null);
  const draggedEventRef = useRef(null);

  const handleEventClick = (info) => {
    const cell = info.el.closest(".fc-daygrid-day");
    popoverTargetRef.current = cell;
    draggedEventRef.current = info.event.id
    setCandidateObject({
      id:info.event.id,
      title: info.event.title,
      startTime: info.event.start,
      endTime: info.event.end,
      location: info.event.extendedProps.location,
    });
if(info.event.id === draggedEventRef.current ){
    setPopoverOpen(true);
}
console.log(popoverOpen,draggedEventRef.current == info.event.id)


  };

  const getPopoverPosition = () => {
    if (!popoverTargetRef.current) {
      return { top: 0, left: 0 };
    }

    const rect = popoverTargetRef.current.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY + rect.height, // Adjust as needed
      left: rect.left + window.scrollX, // Adjust as needed
    };
  };

  const changeView = (view) => {
    setCurrentView(view);
  };

  console.log({currentView})
  return (
    <>
      <div>
       <div>
       <select name="view-toggle" id="view-toggle">
  <option value="Week View" onClick={()=>setCurrentView('timeGridWeek')}>Week View</option>
  <option value="Month View" onClick={()=>setCurrentView('dayGridMonth')}>Month View</option>
</select>
       </div>
        <FullCalendar
          initialView={currentView}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          events={eventArray}
          eventClick={handleEventClick}
          dayMaxEventRows={3}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
          headerToolbar={{
            left: "prev,title,next",
            center: "",
            right: "dayGridMonth,timeGridWeek",
          }}
          titleFormat={{ month: "short" }}
          height={"90vh"}
        />
      </div>
      <Popover
        placement="right"
        isOpen={popoverOpen}
        target={popoverTargetRef.current}
        position={getPopoverPosition()}
      >
        <PopoverHeader>Event Details</PopoverHeader>
        <PopoverBody>
          <div>
            <h5>{candidateObject.title}</h5>
            <p>@{candidateObject.location}</p>
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default Calendar;
