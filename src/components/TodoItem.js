import React from 'react';

const TodoItem = ({ todo, toggleSelect, updateTodo, deleteTodo, updatePriority }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  };

  const calculateDday = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const difference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return difference < 0 ? `D+${Math.abs(difference)}` : `D-${difference}`;
  };

  const isDueSoon = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const difference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return difference >= 0 && difference <= 3;
  };

  return (
    <div
      className={`todo-item ${todo.completed ? 'completed' : ''} ${
        todo.selected ? 'highlight' : ''
      }`}
      style={{ borderLeft: `4px solid ${getPriorityColor(todo.priority)}` }}
    >
      <input
        type="checkbox"
        checked={todo.selected || false}
        onChange={() => toggleSelect(todo.id)}
      />
      <div className="todo-info">
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {isDueSoon(todo.dueDate) && (
            <span className="due-soon-warning">[마감임박] </span>
          )}
          {todo.text}
        </span>
        <div className="todo-details">
          <div className="priority-wrapper">
            <small>우선순위:</small>
            <select
              value={todo.priority}
              onChange={(e) => updatePriority(todo.id, e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <small>마감일: {calculateDday(todo.dueDate)}</small>
          <small>생성일: {new Date(todo.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => updateTodo(todo.id)}>{todo.completed ? '미완료' : '완료'}</button>
        <button onClick={() => deleteTodo(todo.id)}>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
