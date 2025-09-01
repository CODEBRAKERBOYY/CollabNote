import API from "./api";

export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

export const createNote = async (title, content) => {
  const res = await API.post("/notes", { title, content });
  return res.data;
};

export const updateNote = async (id, title, content) => {
  const res = await API.put(`/notes/${id}`, { title, content });
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};
