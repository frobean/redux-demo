import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, selectCategories } from '../store/todosSlice';

import * as S from './styles/AddTodo.styles.js';
/**
 * Component to add a todo item to the store
 * Uses redux as a store with async thunks
 * @returns
 */

export default function AddTodo() {
  // redux state integration
  const dispatch = useDispatch();
  const existingCategories = useSelector(selectCategories);

  // local state -- standard react stuff
  const [text, setText] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // Dispatch async thunk to create todo via API
      dispatch(createTodo({ text: text.trim(), category }));
      setText('');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
      />

      <S.Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
        <option value="urgent">Urgent</option>
      </S.Select>

      <S.SubmitButton type="submit">
        Add Todo
      </S.SubmitButton>
    </S.Form>
  );
}
