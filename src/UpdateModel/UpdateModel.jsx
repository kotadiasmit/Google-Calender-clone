import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMyEvent, deleteMyEvent, updateMyEvent } from "../Store/reducer";
import "./UpdateModel.css";
const UpdateModel = ({ addAndUpdateEvent, closeModel, isAddEvent }) => {
  const { title, desc, id, start, end } = addAndUpdateEvent;
  const [show, setShow] = useState(true);
  const [eventTitle, setEventTitle] = useState(title);
  const [description, setDescription] = useState(desc);
  const [startTime, setStartTime] = useState(start.toLocaleTimeString());
  const [endTime, setEndTime] = useState(end.toLocaleTimeString());
  const [errorMsg, setErrorMsg] = useState("");
  // console.log(start);
  // console.log(endTime);
  // console.log(addAndUpdateEvent);

  const dispatch = useDispatch();
  const modalClose = () => {
    closeModel();
    setShow(false);
  };

  const showErrorMsg = (trimmedEventTitle, trimmedDescription) => {
    if (trimmedEventTitle === "" && trimmedDescription !== "") {
      setErrorMsg("please enter valid title");
    } else if (trimmedEventTitle !== "" && trimmedDescription === "") {
      setErrorMsg("please enter valid description");
    } else if (trimmedEventTitle === "" && trimmedDescription === "") {
      setErrorMsg("please enter valid title & description");
    }
  };

  const titleInputChanged = (event) => {
    const { value } = event.target;
    setEventTitle(value);
    setErrorMsg("");
  };
  const descriptionChanged = (event) => {
    const { value } = event.target;
    setDescription(value);
    setErrorMsg("");
  };
  const onStartTimeChange = (event) => {
    const { value } = event.target;
    if (endTime < value && endTime.slice(3, 5) !== "00") {
      alert("select valid time");
      return;
    }

    setStartTime(value);
  };
  const onEndTimeChange = (event) => {
    const { value } = event.target;
    if (startTime > value && value.slice(3, 5) !== "00") {
      if (startTime.slice(3, 5) >= value.slice(3, 5)) {
        alert("select valid time");
        return;
      }
    }
    setEndTime(value);
  };

  const modalCloseOnAdd = (event) => {
    event.preventDefault();
    const trimmedEventTitle = eventTitle.trim();
    const trimmedDescription = description.trim();

    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    let endDate = end.getDate();
    if (end.toLocaleTimeString() === "00:00:00") {
      endDate = endDate - 1;
    }
    console.log(endYear, endMonth, endDate);

    if (trimmedEventTitle && trimmedDescription) {
      let AddOrUpdateEventDetails = {
        id: id,
        title: trimmedEventTitle,
        desc: trimmedDescription,
        start: new Date(`${moment(start).format("ll")} ${startTime}`),
        end: new Date(`${endYear}/${endMonth + 1}/${endDate} ${endTime}`),
      };
      isAddEvent
        ? dispatch(addMyEvent(AddOrUpdateEventDetails))
        : dispatch(updateMyEvent(AddOrUpdateEventDetails));
      setShow(false);
      closeModel();
    } else {
      showErrorMsg(trimmedEventTitle, trimmedDescription);
    }
  };

  const deleteEvent = () => {
    const id = addAndUpdateEvent.id;
    closeModel();
    dispatch(deleteMyEvent(id));
  };

  return (
    <>
      <Modal centered show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isAddEvent ? "Add Event" : "Update Event"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="form-container" onSubmit={modalCloseOnAdd}>
            <label className="label" htmlFor="eventTitle">
              Event Title
            </label>
            <input
              className="input"
              type="text"
              id="eventTitle"
              placeholder="your name"
              maxLength="40"
              value={eventTitle}
              onChange={titleInputChanged}
              autoFocus
            />
            <label className="label" htmlFor="textarea">
              Description
            </label>
            <textarea
              className="textarea"
              // eslint-disable-next-line react/no-unknown-property
              row="5"
              maxLength="200"
              placeholder="your Description"
              value={description}
              onChange={descriptionChanged}
              id="textarea"
            ></textarea>
            <div>
              <label className="time-label" htmlFor="StartTime">
                Start:
              </label>
              <input
                type="time"
                id="startTime"
                className="time"
                value={startTime}
                onChange={onStartTimeChange}
              />

              <label className="time-label" htmlFor="endTime">
                End:
              </label>
              <input
                type="time"
                id="endTime"
                className="time"
                value={endTime}
                onChange={onEndTimeChange}
              />
            </div>
            {errorMsg && (
              <p className="error-msg">
                <sup>*</sup>
                {errorMsg}
              </p>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close Event
          </Button>
          {!isAddEvent && (
            <Button variant="danger" onClick={deleteEvent}>
              Delete Event
            </Button>
          )}
          <Button variant="primary" onClick={modalCloseOnAdd}>
            {isAddEvent ? "Add Event" : "Update Event"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateModel;
