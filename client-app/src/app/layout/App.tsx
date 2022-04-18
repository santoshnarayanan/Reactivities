import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const[activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=> {
      setActivities(response.data);
    })
  },[])


  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=> x.id === id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  

   return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          activites={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          />
      </Container>
       
    </>
  );
}

export default App;
