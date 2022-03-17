import "../styles/globals.css";

import SurveyState from "../context/survey/SurveyState";
import ModalState from "../context/modal/ModalState";

function MyApp({ Component, pageProps }) {
  return (
    <ModalState>
      <SurveyState>
        <Component {...pageProps} />;
      </SurveyState>
    </ModalState>
  );
}

export default MyApp;
