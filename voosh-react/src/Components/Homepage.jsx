import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTodo } from '../Store/actions';

const HomePage = () => {

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId)); 
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 shadow-md">Homepage</h1>
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">To Do</h2>
            {todos.filter(todo => todo.status === 'TO DO').map(todo => (
              <Link to={`/task/${todo.id}`} key={todo.id} className="block mb-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                  <p className="text-gray-600">{todo.description}</p>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md mt-2" onClick={(e) => { e.preventDefault(); handleDelete(todo.id) }}>Delete</button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
            {todos.filter(todo => todo.status === 'IN PROGRESS').map(todo => (
              <Link to={`/task/${todo.id}`} key={todo.id} className="block mb-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                  <p className="text-gray-600">{todo.description}</p>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md mt-2" onClick={(e) => { e.preventDefault(); handleDelete(todo.id) }}>Delete</button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Completed</h2>
            {todos.filter(todo => todo.status === 'COMPLETED').map(todo => (
              <Link to={`/task/${todo.id}`} key={todo.id} className="block mb-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                  <p className="text-gray-600">{todo.description}</p>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md mt-2" onClick={(e) => { e.preventDefault(); handleDelete(todo.id) }}>Delete</button>
                </div>
              </Link>
            ))}
          </div>
        </>
        
        <Link
  to="/task"
  className="block w-full max-w-sm mx-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4 text-center hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  style={{ maxWidth: '300px', margin: '0 auto' }}
>
  Add New Task
</Link>
    </div>
  );
};

export default HomePage;
