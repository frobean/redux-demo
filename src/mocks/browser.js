import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/*
 * MSW Browser Worker Setup
 *
 * This creates a service worker that intercepts network requests
 * in the browser and routes them to our mock handlers.
 *
 * To disable mocking and use a real backend:
 * - Comment out the worker.start() call in main.jsx
 * - Deploy your app with real API endpoints at /api/todos
 */

export const worker = setupWorker(...handlers);
