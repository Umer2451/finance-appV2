import React from 'react';
import logo from './logo.svg';
import AddTasks from './features/taskapp/task';
import Login from './features/login/login';
import { useSelector } from 'react-redux';
function App() {
  const data = useSelector(state => state.loginData);
  console.log(data.userData[0], "FROM APP");
  return (
    <div><Login/></div>
  );
}

export default App;
