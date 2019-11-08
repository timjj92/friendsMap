import React from 'react';
import TaskContainer from '../container/taskContainer.jsx'
// description	text	 
// details	text	 
// due_date	date	 
// priority	integer	 
// category


const usersTasksContainer = (props) => {
  const assigned = [];
  const inProgress = [];
  const done = [];
  for(let i = 0; i < props.tasks.length; i++){
    if(props.tasks[i].status === 1)
      assigned.push(props.tasks[i]);
    else if(props.tasks[i].status === 2)
      inProgress.push(props.tasks[i]);
    else if(props.tasks[i].status === 3)
      done.push(props.tasks[i]);
  }
  return (
    <div>
      <h3>{props.username}'s tasks</h3>
      <div id="tasksContainer">
        <TaskContainer popup={props.popup} title="assigned" list={assigned}/>
        <TaskContainer popup={props.popup} title="in Progress" list={inProgress}/>
        <TaskContainer popup={props.popup} title="Done!" list={done}/>
      </div>
    </div>
    
  )
};

export default usersTasksContainer;