//import SchedulerCalendar from "scheduler-calendarr";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import "./App.css";
import UpdateModel from "./UpdateModel/UpdateModel";

const App = () => {
  const localizer = momentLocalizer(moment);
  const [isUpdateEvent, setIsUpdateEvent] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [addAndUpdateEvent, setAddAndUpdateEvent] = useState("");

  const eventsData = useSelector((state) => state.eventStore.eventList);
  console.log(eventsData);

  const onAddEvent = ({ start, end }) => {
    setIsAddEvent(true);
    const createEvent = {
      id: eventsData.length ? eventsData[eventsData.length - 1].id + 1 : 0,
      start: start,
      end: end,
      title: "",
      desc: "",
    };
    setAddAndUpdateEvent(createEvent);
  };

  const onUpdateEvent = (event) => {
    setAddAndUpdateEvent(eventsData[event.id]);
    setIsUpdateEvent(true);
  };

  const closeModel = () => {
    setIsUpdateEvent(false);
    setIsAddEvent(false);
  };
  return (
    <div className="container">
      <Calendar
        views={["day", "week", "month"]}
        localizer={localizer}
        events={eventsData}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={onUpdateEvent}
        onSelectSlot={onAddEvent}
        className="my-calender"
      />
      {(isUpdateEvent || isAddEvent) && (
        <UpdateModel
          addAndUpdateEvent={addAndUpdateEvent}
          closeModel={closeModel}
          isAddEvent={isAddEvent}
        />
      )}
    </div>
  );
};

export default App;
