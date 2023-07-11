import { createSlice } from "@reduxjs/toolkit";

const myEventsList = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2023, 6, 11),
    end: new Date(2023, 6, 11),
    desc: "",
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 7),
    desc: "My Desc.",
  },
  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2023, 6, 20),
    end: new Date(2023, 6, 20),
    desc: "",
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2023, 5, 10),
    end: new Date(2023, 5, 10),
    desc: "",
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2023, 6, 1),
    end: new Date(2023, 6, 1),
    desc: "",
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2023, 7, 5, 11, 0),
    end: new Date(2023, 7, 5, 12, 0),
    desc: "",
  },
];

const eventReducer = createSlice({
  name: "events",
  initialState: {
    eventList: myEventsList,
  },
  reducers: {
    addMyEvent(state, action) {
      state.eventList.push(action.payload);
    },
    updateMyEvent(state, action) {
      const { id } = action.payload;
      state.eventList.splice(id, 1, action.payload);
    },
    deleteMyEvent(state, action) {
      state.eventList.splice(action.payload, 1);
    },
  },
});
export const { addMyEvent, updateMyEvent, deleteMyEvent } =
  eventReducer.actions;
export default eventReducer.reducer;
