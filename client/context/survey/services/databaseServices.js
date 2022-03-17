import axios from "axios";
import { serverUrl } from "../../../utils/serverURL";

export const upload = async (survey, jwt) => {
  try {
    const createdSurvey = await axios.request({
      method: "POST",
      withCredentials: true,
      credentials: "include",
      url: `${serverUrl}/api/survey/create`,
      data: {
        survey: survey,
      },
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

    return createdSurvey;
  } catch (error) {
    return error.response;
  }
};

export const getOne = async (linkingID) => {
  try {
    const survey = await axios.post(
      `${serverUrl}/api/survey/getone`,
      {
        data: {
          linkingid: linkingID,
        },
      }
    );
    return survey;
  } catch (error) {
    return error.response;
  }
};

export const fetchAll = async (username) => {
  try {
    const surveys = await axios.post(
      `${serverUrl}/api/survey/getall`,
      {
        data: {
          username: username,
        },
      }
    );
    return surveys;
  } catch (error) {
    return error.response;
  }
};

export const deleteOne = async (id, jwt, userid) => {
  try {
    const deleted = await axios.request({
      method: "POST",
      withCredentials: true,
      credentials: "include",
      url: `${serverUrl}/api/survey/delete`,
      data: {
        id: id,
        userid: userid,
      },
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

    return deleted;
  } catch (error) {
    return error.response;
  }
};

export const uploadAnwsers = async (anwsers, surveyID, jwt) => {
  try {
    const anwsersUploaded = await axios.post(
      `${serverUrl}/api/survey/uploadanwsers`,
      {
        data: {
          surveyID: surveyID,
          anwsers: anwsers,
        },
      },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );

    return anwsersUploaded;
  } catch (error) {
    return error.response;
  }
};

export const getAllAnwsersForSurvey = async (id) => {
  try {
    const anwsers = await axios.post(
      `${serverUrl}/api/survey/getallanwsers`,
      {
        data: {
          surveyID: id,
        },
      }
    );

    return anwsers;
  } catch (error) {
    return error.response;
  }
};
