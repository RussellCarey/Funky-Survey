import { useState } from "react";

import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authServices";
import { Text, Container } from "./NavBar.Styled";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";

export default function NavBar({ showModal, userData }) {
  const [popup, setPopup] = useState(false);
  const router = useRouter();

  const clickLogout = () => {
    setPopup(true);
  };

  const onLogout = async () => {
    const logout = await logoutUser();

    if (logout.status === "success") {
      showModal("Logging out succesful, please wait.", "ok");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  const toDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <Container>
      {popup ? (
        <ConfirmPopup text={"Do you want to logout?"} confirm={onLogout} cancel={setPopup} popupState={popup} />
      ) : null}
      <Text onClick={toDashboard}>dashboard</Text>
      <Text onClick={(e) => clickLogout()}>logout {userData.username}</Text>
    </Container>
  );
}
