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
  const [candidateObject, setCandidateObject] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
  });
  const popoverTargetRef = useRef(null);
  const draggedEventRef = useRef(null);
  const handleEventClick = (info) => {
    setPopoverContent(info.event.extendedProps.description);
    const cell = info.el.closest(".fc-daygrid-day");
    popoverTargetRef.current = cell;
    setCandidateObject({
      title: info.event.title,
      startTime: info.event.start,
      endTime: info.event.end,
      location: info.event.extendedProps.location,
    });
    setPopoverOpen(true);
  };
  const handleEventDragStart = (info) => {
    const cell = info.el.closest(".fc-daygrid-day");
    popoverTargetRef.current = cell;
    setPopoverOpen(false);
    draggedEventRef.current = info.event;
  };
  const handleEventDragStop = (info) => {
    const cell = info.el.closest(".fc-daygrid-day");
    popoverTargetRef.current = cell;
    draggedEventRef.current = null;
  };
  console.log({ candidateObject });
  return (
    <>
      <div>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          events={eventArray}
          nowIndicator={true}
          editable={true}
          eventClick={handleEventClick}
          eventDragStart={handleEventDragStart}
          eventDragStop={handleEventDragStop}
          // eventDrop={handleEventDrop}
          dayMaxEventRows={3}
          eventResizableFromStart={true}
          eventDurationEditable={true}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
          headerToolbar={{
            left: "prev,title,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          titleFormat={{ month: "short" }}
          height={"90vh"}
          eventDidMount={(info) => setPopoverOpen(false)}
        />
      </div>
      <Popover
        placement="right"
        isOpen={popoverOpen}
        target={popoverTargetRef.current}
        toggle={() => setPopoverOpen(!popoverOpen)}
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