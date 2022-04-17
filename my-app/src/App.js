import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const[activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response=> {
      console.log(response);
      setActivities(response.data);
    })
  },[])



  return (
    <div className="App">
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <ul>
           {activities.map((activity) => (
               <li key={activity.id}>
                   {activity.title}
               </li>
           ))}
       </ul>
       </header>
    </div>
  );
}

export default App;
