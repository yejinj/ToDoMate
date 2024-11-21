import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo, deleteTodo, toggleSelect, updatePriority }) => {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (a.priority !== b.priority) {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="todo-list">
      {sortedTodos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleSelect={toggleSelect}
            updatePriority={updatePriority}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
