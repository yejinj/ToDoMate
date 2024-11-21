import React, { useState } from 'react';

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleAddTodo = () => {
    if (text.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      selected: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    addTodo(newTodo);
    setText('');
    setPriority('medium');
    setDueDate('');
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDueDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert('마감일은 오늘 이후로 설정해야 합니다.');
      return;
    }
    setDueDate(e.target.value);
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="할 일을 입력하세요"
        maxLength={50}
      />
      <select value={priority} onChange={handlePriorityChange}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={handleDueDateChange}
        min={new Date().toISOString().split('T')[0]}
      />
      <button onClick={handleAddTodo} disabled={text.trim() === '' || !dueDate}>
        추가
      </button>
    </div>
  );
};

export default TodoInput;
