import React, { useState, useEffect, useCallback } from 'react';

const TodoFilter = ({ todos, setFilteredTodos }) => {
  const [priorityFilter, setPriorityFilter] = useState(['medium']);
  const [statusFilter, setStatusFilter] = useState('all');

  const applyFilters = useCallback(() => {
    const filtered = todos.filter((todo) => {
      const priorityMatch =
        priorityFilter.length === 0 || priorityFilter.includes(todo.priority);

      const statusMatch =
        statusFilter === 'all' ||
        (statusFilter === 'in-progress' && !todo.completed) ||
        (statusFilter === 'completed' && todo.completed);

      return priorityMatch && statusMatch;
    });
    setFilteredTodos(filtered);
  }, [todos, priorityFilter, statusFilter, setFilteredTodos]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handlePriorityChange = (e) => {
    const { value, checked } = e.target;
    setPriorityFilter((prev) =>
      checked ? [...prev, value] : prev.filter((priority) => priority !== value)
    );
  };
  
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="todo-filter">
      <div className="filter-section">
        <div className="filter-group">
          <h4>우선순위:</h4>
          <label>
            <input
              type="checkbox"
              value="medium"
              onChange={handlePriorityChange}
              checked={priorityFilter.includes('medium')}
            />
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              value="high"
              onChange={handlePriorityChange}
              checked={priorityFilter.includes('high')}
            />
            High
          </label>
        </div>
        <div className="filter-group">
          <h4>상태:</h4>
          <label>
            <input
              type="radio"
              name="status"
              value="all"
              onChange={handleStatusChange}
              checked={statusFilter === 'all'}
            />
            모든 할 일
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="in-progress"
              onChange={handleStatusChange}
              checked={statusFilter === 'in-progress'}
            />
            진행 중
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="completed"
              onChange={handleStatusChange}
              checked={statusFilter === 'completed'}
            />
            완료됨
          </label>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
