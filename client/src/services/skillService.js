import API from "./api";

// Get all skills
export const getSkills = async () => {
  const response = await API.get("/skills");
  return response.data;
};

// Get single skill
export const getSkillById = async (id) => {
  const response = await API.get(`/skills/${id}`);
  return response.data;
};

// Create skill
export const createSkill = async (skillData) => {
  const response = await API.post("/skills", skillData);
  return response.data;
};

// Update skill
export const updateSkill = async (id, skillData) => {
  const response = await API.put(`/skills/${id}`, skillData);
  return response.data;
};

// Delete skill
export const deleteSkill = async (id) => {
  const response = await API.delete(`/skills/${id}`);
  return response.data;
};