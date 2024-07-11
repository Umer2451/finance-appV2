import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from './taskSlice';

function AddTasks() {
  const tasks = useSelector(state => state.task.tasks);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const onChangeTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const onChangeTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleAddTask = () => {
    dispatch(addTask({ title: taskTitle, description: taskDescription }));
  };

  return (
    <div>
      <div>
        <input
          onChange={onChangeTaskTitle}
          type="text"
          placeholder="Task Title"
          value={taskTitle}
        />
        <input
          onChange={onChangeTaskDescription}
          type="text"
          placeholder="Task Description"
          value={taskDescription}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddTasks;
