import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setCategoryFilter, setSearchText, resetFilters } from '../store/filtersSlice';
import { selectCategories } from '../store/todosSlice';

import * as S from './styles/FilterBar.styles';

/**
 * This component stores the filter state in a redux slice so that it can be shared
 * @returns 
 */
export default function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const categories = useSelector(selectCategories);

  const statusButtons = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <S.Container>
      <S.FilterGroup>
        <S.Label>Search:</S.Label>
        <S.SearchInput
          type="text"
          value={filters.searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          placeholder="Search todos..."
        />
      </S.FilterGroup>

      <S.FilterGroup>
        <S.Label>Status:</S.Label>
        <S.ButtonGroup>
          {statusButtons.map(({ value, label }) => (
            <S.FilterButton
              key={value}
              active={filters.status === value}
              onClick={() => dispatch(setStatusFilter(value))}
            >
              {label}
            </S.FilterButton>
          ))}
        </S.ButtonGroup>
      </S.FilterGroup>

      <S.FilterGroup>
        <S.Label>Category:</S.Label>
        <S.Select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </S.Select>
      </S.FilterGroup>

      <S.ResetButton onClick={() => dispatch(resetFilters())}>
        Reset Filters
      </S.ResetButton>
    </S.Container>
  );
}
