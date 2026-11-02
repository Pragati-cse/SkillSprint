import API from "./api";

// Get all topics
export const getTopics = async () => {
  const response = await API.get("/topics");
  return response.data;
};

// Get single topic
export const getTopicById = async (id) => {
  const response = await API.get(`/topics/${id}`);
  return response.data;
};

// Create topic
export const createTopic = async (topicData) => {
  const response = await API.post("/topics", topicData);
  return response.data;
};

// Update topic
export const updateTopic = async (id, topicData) => {
  const response = await API.put(`/topics/${id}`, topicData);
  return response.data;
};

// Delete topic
export const deleteTopic = async (id) => {
  const response = await API.delete(`/topics/${id}`);
  return response.data;
};