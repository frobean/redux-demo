Redux uses the concept of data stores.  An app should contain a single store. 

Each store is comprised of one or more 'slices'.  A slice is a chunk of data within the store.  In this demo, the store contains 2 slices.  One to manage the todo items, and one to manage a shared filter state across the app.

The filter slice is conceptually the simplest of the two.  It manages the shared filter state, which is completely internal to the application.  

The more complex slice is the todos.  This slice treats the filter as an app-wide filter and uses it to provide a trimmed down set of todos for display.  This works for the demo use case, but if an app needs to display lists of differently filtered todos, this pattern is not optimal.  For that case, you would keep the filtered list data in the react component state.  
This slice also implements a full CRUD async thunking layer to reproduce the behavior of loading/saving items through a RESTful API

Of particular interest, the selectFilteredTodos selector uses createSelector from the redux toolkit to provide a selector for the todos items that is memoized and only regenerated when one of a list of dependencies changes (conceptually similar to useMemo in pure react).  Without this, the selector function will execute on every render and, if there are many todos, can bog the render thread and cause jank.

Worth noting:
* standard selectors will execute every render.  Not a problem when the selectors are lightweight.  useSelector will not trigger a rerender as long as the selector response is stable (it uses identity checks, ===)
* The structure of the selectFilteredTodos selector is not a simple property access.  This accessor filters the todo list on invocation, which returns a different array identity each time, making the filtered list identity not stable from react's perspective.  We wrap the selector here with createSelector to memoize the selector response and only regenerate it when the filter params change.

Thunks:
Only synchronous reducers are defined in the reducers prop in createSlice.  Note the extraReducers prop in the slice definition.  This ties the async thunks into the redux workflows. When an async thunk is dispatched, redux sets the state for the thunk to pending then kicks off the thunked task.  Once a task is run, it is either fulfilled or rejected.  These extra reducers track that flow and allow things like spinners and such during the operation, updates to state after the operation, and proper error reporting if the thunk was not successful.