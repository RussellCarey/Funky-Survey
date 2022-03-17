import { SHOW_MODAL, RESET_MODAL, HIDE_MODAL } from "./types";

export default (state, action) => {
  switch (action.type) {
    // Set the new survey title of building survey
    case SHOW_MODAL:
      return action.payload;

    case HIDE_MODAL:
      return action.payload;

    default:
      return state;
  }
};
