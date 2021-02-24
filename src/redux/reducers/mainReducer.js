import {
  ADD_ENTRY, START_EDIT_ENTRY, END_EDIT_ENTRY, DELETE_ENTRY
} from "../actionTypes";

const initialState = {
  allEntries: [],
  isOpen: false,
  currentEntry: {},
};

export default function mainReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_ENTRY:
      let addData = [...state.allEntries];
      addData.push(payload)
      return {
        ...state,
        allEntries: addData,
      }
    case DELETE_ENTRY:
      const deleteData = [...state.allEntries].filter((el) => el.id !== payload.id)
      return {
        ...state,
        allEntries: deleteData,
      }
    case START_EDIT_ENTRY:
      return {
        ...state,
        isOpen: true,
        currentEntry: payload
      }
    case END_EDIT_ENTRY:
      const editedData = [...state.allEntries].map((el) => {
        if (el.id === state.currentEntry.id) {
          el.name = payload.name;
          el.type = payload.type;
          el.color = payload.color;
        }
        return el
      })
      return {
        ...state,
        isOpen: false,
        allEntries: editedData,
        currentEntry: {}
      }
    default:
      return state
  }
};