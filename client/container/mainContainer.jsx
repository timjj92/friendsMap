import React, { Component } from 'react';
import UserInfo from '../components/userInfoDisplay.jsx';
import UsersTasksContainer from '../container/usersTasksContainer.jsx';
import AddTaskPopup from '../components/addTaskPopup.jsx';
import EachTaskPopup from '../components/eachTaskPopup.jsx';

class mainContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      addTaskPopup: false,
      taskToShow: 0,
    };
    this.toggleAddTask = this.toggleAddTask.bind(this);
    this.toggleSaveTask = this.toggleSaveTask.bind(this);
    this.toggleEachTask = this.toggleEachTask.bind(this);
    this.toggleSaveEachTask = this.toggleSaveEachTask.bind(this);
  }

  toggleEachTask(taskid){
    console.log("clicked ", taskid);
    this.setState({taskToShow: taskid});
  }

  toggleSaveEachTask(){
    console.log("Each task save clicked");
    fetch(`/task`)
    .then(data => data.json())
    .then(data => {
      console.log("togglesaveEachTask", data);
      let {tasks} = data;
      console.log(tasks);
      this.setState({
        tasks,
        taskToShow: 0
      });
    })
    .catch(() => console.log("error on getting tasks"));
  }

  toggleAddTask() {  
    console.log("add clicked");
    this.setState({  
      addTaskPopup: !this.state.addTaskPopup  
    });  
  }  

  toggleSaveTask() {  
    console.log("save clicked");
    fetch(`/task`)
    .then(data => data.json())
    .then(data => {
      let {tasks} = data;
      this.setState({
        tasks,
        addTaskPopup: !this.state.addTaskPopup
      });
    })
    .catch(() => console.log("error on getting tasks"));
  }  

  componentDidMount(){
    console.log("maincontainer cocpoment did mount");
    let userName = this.props.userInfo.username;
    let isAdmin = this.props.userInfo.isAdmin;
    if(!isAdmin){
      fetch(`/task/${userName}`)
      .then(data => data.json())
      .then(data => {
        let {tasks} = data;
        this.setState({tasks});
      })
      .catch(() => console.log("error on getting tasks"));
    }
    else{
      fetch(`/task`)
      .then(data => data.json())
      .then(data => {
        let {tasks} = data;
        this.setState({tasks});
      })
      .catch(() => console.log("error on getting tasks"));
    }
  }

  render(){
    console.log('rendering');
    if(this.props.userInfo.isAdmin){
      let organizedTasks= {};
      for(let i =0; i< this.state.tasks.length; i++){
        if(!organizedTasks[this.state.tasks[i].user_name])
          organizedTasks[this.state.tasks[i].user_name] = [];
        organizedTasks[this.state.tasks[i].user_name].push(this.state.tasks[i]);
      }
      let displayArr=[];
      let userList = Object.keys(organizedTasks);
      for(let i = 0 ; i < userList.length; i++){
        displayArr.push(<UsersTasksContainer popup={this.toggleEachTask} key={i} username={userList[i]} tasks={organizedTasks[userList[i]]}/>);
      }
      return (
        <div id="container">
          <UserInfo info={this.props.userInfo}/>
          <button id="addTask" onClick={this.toggleAddTask}>+ Add Tasks</button>
          {this.state.addTaskPopup ?  <AddTaskPopup userList={this.props.usersArr} closePopup={this.toggleSaveTask}/> : null} 
          {this.state.taskToShow !==0 ?  <EachTaskPopup taskId={this.state.taskToShow} closePopup={this.toggleSaveEachTask}/> : null} 
          {displayArr}

        </div>
      )
    }
    else {
      return(
        <div id="container">
          <UserInfo info={this.props.userInfo}/>
          <UsersTasksContainer  popup={this.toggleEachTask} username= {this.props.userInfo.username} tasks={this.state.tasks}/>
          {this.state.taskToShow !==0 ?  <EachTaskPopup taskId={this.state.taskToShow} closePopup={this.toggleSaveEachTask}/> : null} 
        </div>
      )
    }
    
  }

}

export default mainContainer;