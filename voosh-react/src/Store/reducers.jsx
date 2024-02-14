
import { combineReducers } from 'redux';
import { ADD_TODO, EDIT_TODO, DELETE_TODO, LOGIN, LOGOUT } from './actions';

const persistedTodos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

  // reducer for todo
const todoReducer = (state = persistedTodos, action) => {
  let newState;
  switch (action.type) {
    case ADD_TODO:
      newState = [...state, action.payload];
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    case EDIT_TODO:
      newState = state.map(todo =>
        todo.id === action.payload.id ? action.payload.updatedTodo : todo
      );
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    case DELETE_TODO:
      newState = state.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    case LOGOUT:
      localStorage.removeItem('todos');
      return [];
    default:
      return state;
  }
};

// Reducer for authentication
const authReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos: todoReducer,
  isLoggedIn: authReducer,
});

export default rootReducer;
