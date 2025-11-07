The components here make use of both react state, for managing their internal bits, as well as a redux store to display and manipulate the list of todo items and a "global" filter.

The redux store is accessed via a set of selectors (for reading state) and actions are dispatched from the components to a set of reducers defined in the slices for mutating state.  

State persistence to a backend server is handled in the redux store layer.  Redux strives to be the one "source of truth" for the data it manages, so this is the correct architecture in most cases.

Terminology:

What is a Thunk?

A "thunk" is a function that wraps an expression to delay its evaluation. Think of it as "code wrapped in a function to run later."

Redux Thunks

In Redux, a thunk is a function that returns a function instead of returning an action directly. This lets you:
1. Write async logic (API calls)
2. Dispatch multiple actions
3. Access the current state