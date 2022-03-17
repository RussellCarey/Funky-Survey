import React, { useReducer } from "react";
import { SHOW_MODAL, RESET_MODAL, HIDE_MODAL } from "./types";
import ModalContext from "./ModalContext";
import ModalReducer from "./ModalReducer";

const ModalState = (props) => {
  const state = {
    show: false,
    text: "",
    type: "",
  };

  // When creating a new survey
  const [modalState, dispatch] = useReducer(ModalReducer, state);

  const showModal = (text, type) => {
    console.log(text, type);
    const payload = { text: text, type: type, show: true };
    dispatch({
      type: SHOW_MODAL,
      payload: payload,
    });
  };

  const hideModal = () => {
    const payload = { ...modalState, show: false };
    dispatch({
      type: HIDE_MODAL,
      payload: payload,
    });
  };

  const resetModal = () => {
    const payload = { text: "", type: "", show: false };
    dispatch({
      type: RESET_MODAL,
      payload: payload,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        showModal,
        hideModal,
        resetModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
