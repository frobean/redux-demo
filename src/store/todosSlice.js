import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

/*
 * TODOS REDUX SLICE
 *
 * This file contains production-ish Redux code that makes real HTTP requests.
 * The backend is currently mocked by MSW which intercepts fetch requests
 * and responds with mock data stored in localStorage.
 *
 * To switch to a real backend:
 * - Remove MSW initialization in main.jsx
 * - Deploy a real API at /api/todos with the same endpoints
 * - No changes needed to this file!
 */

// Async Thunks - These make real HTTP requests

export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) throw new Error('Failed to load todos');
    return response.json();
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, ...data }) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return id; // Return the ID to remove from state
  }
);

export const batchUpdateTodos = createAsyncThunk(
  'todos/batchUpdate',
  async (operation) => {
    const response = await fetch('/api/todos/batch', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operation }),
    });
    if (!response.ok) throw new Error('Failed to batch update');
    return response.json();
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // No synchronous reducers needed - all operations go through async thunks
    // This ensures proper server synchronization and loading states
  },
  extraReducers: (builder) => {
    builder
      // Load todos
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete todo
      .addCase(deleteTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Batch update
      .addCase(batchUpdateTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchUpdateTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(batchUpdateTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectTodosLoading = (state) => state.todos.loading;

// Memoized selector - only recalculates when todos or filters change
// Prevents unnecessary re-renders when filtering large lists
export const selectFilteredTodos = createSelector(
  [
    (state) => state.todos.items,
    (state) => state.filters.status,
    (state) => state.filters.category,
    (state) => state.filters.searchText,
  ],
  (todos, status, category, searchText) => {
    return todos.filter(todo => {
      // Filter by status
      if (status === 'active' && todo.completed) return false;
      if (status === 'completed' && !todo.completed) return false;

      // Filter by category
      if (category !== 'all' && todo.category !== category) return false;

      // Filter by search text
      if (searchText && !todo.text.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }

      return true;
    });
  }
);

export const selectTodoStats = (state) => {
  const todos = state.todos.items;
  return {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };
};

export const selectCategories = (state) => {
  const todos = state.todos.items;
  const categories = new Set(todos.map(t => t.category));
  return Array.from(categories);
};

export default todosSlice.reducer;
