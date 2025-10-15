export const addItemToServer = async (task, date) => {
  const response = await fetch("http://localhost:3001/api/todo", {
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
  await fetch(`http://localhost:3001/api/todo/${id}`, {
    method: "DELETE",
  });

  return id;
};
export const getItemsFromServer = async () => {
  const response = await fetch("http://localhost:3001/api/todo");
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};
export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(
    `http://localhost:3001/api/todo/${id}/completed`,
    {
      method: "PUT",
    }
  );
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};
export const handleToggleComplete = async (id) => {
    await markItemCompletedOnServer(id);
    // Find the item and toggle its completed status
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        // Create a new object with toggled 'completed' property
        return { ...item, completed: true };
      }
      return item;
    });

    // Update state
    setTodoItems(updatedItems);
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