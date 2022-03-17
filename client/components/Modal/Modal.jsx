import { useEffect, useContext } from "react";
import { Container, Text } from "./Modal.Styled";
import ModalContext from "../../context/modal/ModalContext";

export default function Modal() {
  const modalContext = useContext(ModalContext);
  const { modalState, hideModal } = modalContext;

  useEffect(() => {
    setTimeout(() => {
      hideModal();
    }, 3000);
  }, []);

  return (
    <Container type={modalState.type}>
      <Text>{modalState.text}</Text>
    </Container>
  );
}
