
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const editTodo = (id, updatedTodo) => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
