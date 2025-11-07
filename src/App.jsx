import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTodos } from './store/todosSlice';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import TodoStats from './components/TodoStats';
import './App.css';

import * as S from './App.styles.js'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load todos from API on mount
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <S.AppContainer>
      <S.Title>Redux Todo App</S.Title>
      <S.Subtitle>Production-ready state management with MSW</S.Subtitle>

      <TodoStats />
      <AddTodo />
      <FilterBar />
      <TodoList />

      <S.InfoBox>
        <S.InfoTitle>Redux Features Demonstrated:</S.InfoTitle>
        <S.FeatureList>
          <li><strong>Async Thunks:</strong> All CRUD operations via real HTTP requests</li>
          <li><strong>Mock Service Worker:</strong> API mocking with MSW (src/mocks/)</li>
          <li><strong>Multiple Slices:</strong> Separate todos and filters state</li>
          <li><strong>Selectors:</strong> Computed/filtered data (selectFilteredTodos, selectTodoStats)</li>
          <li><strong>Loading States:</strong> Proper pending/fulfilled/rejected handling</li>
          <li><strong>Complex State:</strong> Multiple filters working together</li>
          <li><strong>Derived State:</strong> Statistics calculated from store</li>
          <li><strong>Production-Ready:</strong> Swap MSW for real backend with zero code changes</li>
        </S.FeatureList>
      </S.InfoBox>
    </S.AppContainer>
  );
}

export default App;
