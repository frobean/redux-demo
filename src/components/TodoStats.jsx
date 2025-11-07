import { useDispatch, useSelector } from 'react-redux';
import { selectTodoStats, batchUpdateTodos } from '../store/todosSlice';

import * as S from './styles/TodoStats.styles';


export default function TodoStats() {
  const dispatch = useDispatch();
  const stats = useSelector(selectTodoStats);

  return (
    <S.Container>
      <S.Title>Statistics</S.Title>

      <S.StatsGrid>
        <S.StatCard>
          <S.StatValue color="#646cff">{stats.total}</S.StatValue>
          <S.StatLabel>Total</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue color="#4caf50">{stats.active}</S.StatValue>
          <S.StatLabel>Active</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue color="#ff9800">{stats.completed}</S.StatValue>
          <S.StatLabel>Completed</S.StatLabel>
        </S.StatCard>
        {stats.total > 0 && (
          <S.StatCard>
            <S.StatValue color="#9c27b0">
              {Math.round((stats.completed / stats.total) * 100)}%
            </S.StatValue>
            <S.StatLabel>Progress</S.StatLabel>
          </S.StatCard>
        )}
      </S.StatsGrid>

      <S.ButtonGroup>
        <S.ActionButton
          onClick={() => dispatch(batchUpdateTodos('toggleAll'))}
          disabled={stats.total === 0}
        >
          Toggle All
        </S.ActionButton>
        <S.ActionButton
          variant="danger"
          onClick={() => dispatch(batchUpdateTodos('clearCompleted'))}
          disabled={stats.completed === 0}
        >
          Clear Completed
        </S.ActionButton>
      </S.ButtonGroup>
    </S.Container>
  );
}
