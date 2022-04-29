import React, {ChangeEvent, useState} from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity: Activity | undefined;
    closeForm: () => void;
}

export default function ActivityForm({activity:selectedActivity, closeForm}:Props){
    const initialState = selectedActivity ?? {
        id:'', date:'', title:'', category:'',venue:'', city:'',description:''
    };

    const[activity, setActivity] = useState(initialState);

    function handleSubmit(){
        console.log(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name, value} = event.target;
        setActivity({...activity, [name]:value})
    }
    return(
        <Segment clearing>
            <Form onSubmit = {handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venu' />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}