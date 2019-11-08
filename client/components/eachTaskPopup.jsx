import React from 'react';  

class EachTaskPopup extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      tasks: {
        description: "",
        details: "",
        duedate: "",
        priority: 0,
        status: 1,
        subtasks: [],

      },
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(){
    fetch(`/task/${this.props.taskId}?status=${this.state.tasks.status}`, {  
      method: 'POST'
    })
    .then(()=>{
      this.props.closePopup();
    })
    .catch(err => console.log(err));
  }

  changeStatus() {
    let newTasks = JSON.parse(JSON.stringify(this.state.tasks));
    if(newTasks.status === 1) 
      newTasks.status = 2;
    else if(newTasks.status === 2)
      newTasks.status = 3;
    else 
      newTasks.status = 1;
    this.setState({tasks:newTasks});
  }

  componentDidMount(){
    fetch(`/task/id/${this.props.taskId}`)
      .then(data => data.json())
      .then(data => {
        let {tasks} = data;
        console.log("each tasks info ",tasks);
        this.setState({tasks});
      })
      .catch(() => console.log("error on getting tasks"));
  }

  render() {  
    console.log("each task popup rendering")
    let subtasksArr = [];
    for(let i = 0 ; i < this.state.tasks.subtasks.length ;i++){
      console.log(this.state.tasks.subtasks[i]);
      subtasksArr.push(<li id= "subtask">{this.state.tasks.subtasks[i].description}</li>);
    }
    let button = [];
    if(this.state.tasks.status === 1){
      button.push(<button id="assigned" onClick={this.changeStatus}>Start task</button>);
    }
    else if(this.state.tasks.status === 2){
      button.push(<button id="inprogress" onClick={this.changeStatus}>In progress</button>);
    }
    else if(this.state.tasks.status === 3){
      button.push(<button id="completed" onClick={this.changeStatus}>Done</button>);
    }
    return (  
      <div className='popup'>  
        <div className='popup_inner'>  
          <div id="popupContent">
            <p id="close" onClick={this.handleSave}>close</p>
            <h2>{this.state.tasks.description}</h2>
            <h3>Details</h3>
            <h4>{this.state.tasks.details}</h4>
            <h3>Due Date</h3>
            <h4>{this.state.tasks.due_date}</h4>
            <h3>Subtasks</h3>
            {subtasksArr}
            {button}
          </div>
        </div>  
      </div>  
    );  
  }  
}  

export default EachTaskPopup ;