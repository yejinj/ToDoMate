import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
      setFilteredTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const toggleSelect = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, selected: !todo.selected } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setSelectedCount(updatedTodos.filter((todo) => todo.selected).length);
  };

  const toggleSelectAll = () => {
    const allSelected = filteredTodos.every((todo) => todo.selected);
    const updatedTodos = filteredTodos.map((todo) => ({
      ...todo,
      selected: !allSelected,
    }));
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        updatedTodos.some((updated) => updated.id === todo.id)
          ? { ...todo, selected: !allSelected }
          : todo
      )
    );
    setFilteredTodos(updatedTodos);
    setSelectedCount(updatedTodos.filter((todo) => todo.selected).length);
  };

  const deleteSelectedTodos = () => {
    const selectedCount = filteredTodos.filter((todo) => todo.selected).length;
    if (selectedCount === 0) {
      alert('선택된 항목이 없습니다.');
      return;
    }
    if (window.confirm(`선택한 ${selectedCount}개의 항목을 삭제하시겠습니까?`)) {
      const updatedTodos = todos.filter((todo) => !todo.selected);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setSelectedCount(0);
      alert('선택된 항목이 삭제되었습니다.');
    }
  };

  const toggleCompleteSelected = () => {
    const selectedCount = filteredTodos.filter((todo) => todo.selected).length;
    if (selectedCount === 0) {
      alert('선택된 항목이 없습니다.');
      return;
    }
    if (window.confirm('선택한 항목들의 완료 상태를 변경하시겠습니까?')) {
      const updatedTodos = todos.map((todo) =>
        todo.selected ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setSelectedCount(updatedTodos.filter((todo) => todo.selected).length);
      alert('선택된 항목들의 상태가 변경되었습니다.');
    }
  };

  const updatePriority = (id, newPriority) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, priority: newPriority } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoFilter todos={todos} setFilteredTodos={setFilteredTodos} />
      <div className="action-buttons">
        <button onClick={toggleSelectAll}>전체 선택 / 선택 해제</button>
        <button onClick={deleteSelectedTodos}>선택 항목 삭제</button>
        <button onClick={toggleCompleteSelected}>상태 변경 완료 / 미완료</button>
      </div>
      <p>{selectedCount}개의 항목이 선택됨</p>
      <TodoList
        todos={filteredTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        toggleSelect={toggleSelect}
        updatePriority={updatePriority}
      />
    </div>
  );
}

export default App;
