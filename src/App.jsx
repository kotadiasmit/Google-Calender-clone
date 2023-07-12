import moment from "moment/moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import AddUpdateEvent from "./AddUpdateEvent/AddUpdateEvent";
import "./App.css";

const App = () => {
  const [isUpdateEvent, setIsUpdateEvent] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [addAndUpdateEvent, setAddAndUpdateEvent] = useState("");

  const localizer = momentLocalizer(moment);
  const eventsData = useSelector((state) => state.eventStore.eventList);

  const onAddEvent = ({ start, end }) => {
    const myEndDate = moment(end).subtract(1, "second")._d;

    setIsAddEvent(true);
    const createEvent = {
      id: eventsData.length ? eventsData[eventsData.length - 1].id + 1 : 0,
      start: start,
      end: myEndDate,
      title: "",
      desc: "",
    };
    setAddAndUpdateEvent(createEvent);
  };

  const onUpdateEvent = (event) => {
    const index = eventsData.findIndex(
      (eventDetails) => eventDetails.id === event.id
    );
    setAddAndUpdateEvent(eventsData[index]);
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
        <AddUpdateEvent
          addAndUpdateEvent={addAndUpdateEvent}
          closeModel={closeModel}
          isAddEvent={isAddEvent}
        />
      )}
    </div>
  );
};

export default App;
