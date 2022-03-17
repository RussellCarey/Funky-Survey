import axios from "axios";
import { serverUrl } from "./serverURL";

// GetProps cannot use state as it is loaded before the page. These functions allow for function in getProps..
export const getOneSurvey = async (uuid) => {
  try {
    const survey = await axios.post(
      `${serverUrl}/api/survey/getone`,
      {
        withCredentials: true,
        credentials: "include",
        data: {
          uuid: uuid,
        },
      }
    );

    return survey;
  } catch (error) {
    return error.response;
  }
};

export const getAllSurveys = async (jwt) => {
  try {
    const surveys = await axios.post(
      `${serverUrl}/api/survey/getall`,
      {
        withCredentials: true,
        credentials: "include",
      },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );

    return surveys;
  } catch (error) {
    return error.response;
  }
};

export const getPercentageResults = async (uuid, jwt) => {
  try {
    const survey = await axios.post(
      `${serverUrl}/api/survey/getsurveyresults`,
      {
        withCredentials: true,
        credentials: "include",
        data: {
          uuid: uuid,
        },
      },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );

    return survey;
  } catch (error) {
    return error.response;
  }
};
