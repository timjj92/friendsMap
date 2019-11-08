import React from 'react';
import TaskDisplay from '../components/taskDisplay.jsx';
// description	text	 
// details	text	 
// due_date	date	 
// priority	integer	 
// category


const TaskContainer = (props) => {
  const tasks = [];
  console.log(props.list);
  for(let i = 0; i < props.list.length; i++){
    tasks.push(<TaskDisplay popup={props.popup} key={i} info={props.list[i]}/>)
  }
  return (
      <div id ="taskContainer">
        <p id="statusId">{props.title}</p>
        {tasks}
      </div>
  )
};

export default TaskContainer;