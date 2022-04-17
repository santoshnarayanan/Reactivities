import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activites: Activity[];
}

export default function ActivityDashboard({activites}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <List>
           {activites.map(activity => (
               <List.Item key={activity.id}>
                   {activity.title}
               </List.Item>
           ))}
       </List>
            </Grid.Column>
        </Grid>
    )
}

