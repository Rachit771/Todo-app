import { useContext } from "react";
import { TodoItemsContext } from "../store/todoitem-store";
import { Todoitem } from "./Todoitem";

export const Todoitems = () => {
  const { todoItems, handledelete, handleToggleComplete } = useContext(TodoItemsContext);

  //  Group items 
  const pendingItems = todoItems.filter((item) => !item.completed);
  const completedItems = todoItems.filter((item) => item.completed);

  return (
    <div>
      {/*  Pending (to-do) tasks */}
      {pendingItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Tasks to Do</h2>
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <Todoitem
                key={item.id}
                id={item.id}
                tododate={item.dueDate}     // ✅ match sir’s property name
                todoname={item.name}
                completed={item.completed}
                ondelete={handledelete}
                onToggleComplete={handleToggleComplete} // ✅ new addition
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed tasks */}
      {completedItems.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-500 mb-3">
            Completed Tasks
          </h2>
          <div className="space-y-3">
            {completedItems.map((item) => (
              <Todoitem
                key={item.id}
                id={item.id}
                tododate={item.dueDate}
                todoname={item.name}
                completed={item.completed}
                ondelete={handledelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


