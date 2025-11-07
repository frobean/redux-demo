import { http, HttpResponse, delay } from 'msw';

/*
 * Mock Service Worker (MSW) Handlers
 *
 * These handlers intercept HTTP requests and provide mock responses.
 * Using localStorage as our mock database, but the Redux slice
 * makes real fetch() calls - it has no idea this is mocked!
 *
 * To swap to a real backend: just remove MSW initialization in main.jsx
 */

// Helper to get todos from localStorage
const getTodosFromStorage = () => {
  const stored = localStorage.getItem('todos');
  return stored ? JSON.parse(stored) : [];
};

// Helper to save todos to localStorage
const saveTodosToStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const handlers = [
  // GET /api/todos - Fetch all todos
  http.get('/api/todos', async () => {
    await delay(500); // Simulate network latency
    const todos = getTodosFromStorage();
    return HttpResponse.json(todos);
  }),

  // POST /api/todos - Create new todo
  http.post('/api/todos', async ({ request }) => {
    await delay(300);

    const body = await request.json();
    const todos = getTodosFromStorage();

    const newTodo = {
      id: Date.now(), // Mock server-generated ID
      text: body.text,
      completed: false,
      category: body.category || 'general',
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    saveTodosToStorage(todos);

    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // PUT /api/todos/:id - Update todo
  http.put('/api/todos/:id', async ({ request, params }) => {
    await delay(300);

    const { id } = params;
    const body = await request.json();
    const todos = getTodosFromStorage();

    const index = todos.findIndex(t => t.id === Number(id));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    todos[index] = { ...todos[index], ...body };
    saveTodosToStorage(todos);

    return HttpResponse.json(todos[index]);
  }),

  // DELETE /api/todos/:id - Delete todo
  http.delete('/api/todos/:id', async ({ params }) => {
    await delay(300);

    const { id } = params;
    const todos = getTodosFromStorage();

    const filteredTodos = todos.filter(t => t.id !== Number(id));

    if (filteredTodos.length === todos.length) {
      return HttpResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    saveTodosToStorage(filteredTodos);

    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH /api/todos/batch - Batch operations (toggle all, clear completed)
  http.patch('/api/todos/batch', async ({ request }) => {
    await delay(300);

    const body = await request.json();
    let todos = getTodosFromStorage();

    if (body.operation === 'toggleAll') {
      const allCompleted = todos.every(t => t.completed);
      todos = todos.map(t => ({ ...t, completed: !allCompleted }));
    } else if (body.operation === 'clearCompleted') {
      todos = todos.filter(t => !t.completed);
    }

    saveTodosToStorage(todos);

    return HttpResponse.json(todos);
  }),
];
