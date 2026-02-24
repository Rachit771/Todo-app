const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export const addItemToServer = async (task, date) => {
  const response = await fetch(buildApiUrl("/api/todo"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};
export const deleteItemFromServer = async (id) => {
  await fetch(buildApiUrl(`/api/todo/${id}`), {
    method: "DELETE",
  });

  return id;
};
export const getItemsFromServer = async () => {
  const response = await fetch(buildApiUrl("/api/todo"));
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};
export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(buildApiUrl(`/api/todo/${id}/completed`), {
    method: "PUT",
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    duedate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
