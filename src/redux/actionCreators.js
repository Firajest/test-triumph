import {
  ADD_ENTRY, START_EDIT_ENTRY,END_EDIT_ENTRY, DELETE_ENTRY
} from './actionTypes';

export const addEntry = (entry) => ({ type: ADD_ENTRY, payload: entry });
export const deleteEntry = (entry) => ({ type: DELETE_ENTRY, payload: entry });
export const startEditEntry = (entry) => ({ type: START_EDIT_ENTRY, payload: entry });
export const endEditEntry = (entry) => ({ type: END_EDIT_ENTRY, payload: entry });
