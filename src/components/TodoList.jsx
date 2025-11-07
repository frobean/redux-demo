import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, deleteTodoAsync, selectFilteredTodos } from '../store/todosSlice';

import * as S from './styles/TodoList.styles.js';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      // Update todo via API
      dispatch(updateTodo({ id: todo.id, text: editText.trim() }));
      setIsEditing(false);
    }
  };

  const handleToggle = () => {
    // Toggle completed status via API
    dispatch(updateTodo({ id: todo.id, completed: !todo.completed }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <S.TodoItemContainer>
      <S.Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />

      {isEditing ? (
        <S.EditInput
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <S.TodoText
          completed={todo.completed}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </S.TodoText>
      )}

      <S.CategoryBadge>{todo.category}</S.CategoryBadge>

      <S.Button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </S.Button>

      <S.Button variant="delete" onClick={() => dispatch(deleteTodoAsync(todo.id))}>
        Delete
      </S.Button>
    </S.TodoItemContainer>
  );
}

export default function TodoList() {
  const todos = useSelector(selectFilteredTodos);
  const loading = useSelector(state => state.todos.loading);

  if (loading) {
    return <S.LoadingMessage>Loading todos...</S.LoadingMessage>;
  }

  if (todos.length === 0) {
    return <S.EmptyMessage>No todos found. Add one above!</S.EmptyMessage>;
  }

  return (
    <S.ListContainer>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </S.ListContainer>
  );
}
