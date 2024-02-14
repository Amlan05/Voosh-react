import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addTodo, editTodo } from '../Store/actions';


const Task = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const todos = useSelector(state => state.todos);

    const [userTask, setUserTask] = useState({
        title: '',
        description: '',
        status: ''
      });
    
 

  const handleSubmit = (e) => {

    e.preventDefault()

    let updatedUserTask = { ...userTask };

  if (id) {
    dispatch(editTodo(id, updatedUserTask));
  } else {
    updatedUserTask.id = (Math.random() * 10).toString();
    dispatch(addTodo(updatedUserTask));
  }

  setTimeout(() => {
    navigate('/');
  }, 1000);

  };

  const handleChange = (e) => {
    setUserTask({...userTask, [e.target.name]:e.target.value})
  }

 useEffect(() => {
    console.log(id)
    if (id) {
      const existingTask = todos.find(todo => todo.id === id);
      if (existingTask) {
        setUserTask(existingTask);
      } 
    }
  }, [id, todos]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Create New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            value={userTask.title}
            name='title'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description</label>
          <textarea
            id="taskDescription"
            name='description'
            value={userTask.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32"
            required
          />
        </div>
        <div>
          <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700">Task Status</label>
          <select
            id="taskStatus"
            name='status'
            value={userTask.status}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select Status</option>
            <option value="TO DO">To Do</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">{id ? "Edit Task" : "Create Task"}</button>
      </form>
    </div>
  );
};

export default Task;
