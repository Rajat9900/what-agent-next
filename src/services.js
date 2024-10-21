import axios from "axios";

const api_url = "https://backendsharebrain.whatagent.net/";

export const getAllChats = (token) => {
  return axios.get(api_url + "chats/history", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const sendMessageToChat = (session_id, question, token) => {
  return axios.post(
    api_url + `chats/${session_id}/messages`,
    { question },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const createNewChat = (payload, token) => {
  return axios.post(api_url + "create-chat", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const createNewTopics = (payload, token) => {
  return axios.post(api_url + "topics", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const getPublicTopics = () => {
    return axios.get(`${api_url}topics/public`);
  };
