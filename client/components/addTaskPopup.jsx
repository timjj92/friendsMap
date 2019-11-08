import React from 'react';  

class AddTaskPopup extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      subTasks: [],
      assignedMember: [],
    };


  //     description	text	 
  // details	text	 
  // due_date	date	 
  // priority	integer	 
  // status	integer

    this.addSubTasks = this.addSubTasks.bind(this);
    this.updateSubtaskVal = this.updateSubtaskVal.bind(this);

    this.updateDescription = this.updateDescription.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updatePriority = this.updatePriority.bind(this);

    this.updateAssignedTo = this.updateAssignedTo.bind(this);
    this.addAssignee = this.addAssignee.bind(this);
    
    this.handleSave = this.handleSave.bind(this);

    this.description = "";
    this.details = "";
    this.date = "";
    this.priority = 1;
    this.subTaskVal = "";
    this.assignedto= "";
  }

  updateDescription(e) {
    this.description = e.target.value;
    console.log(this.description);
  }
  updateDetails(e) {
    this.details = e.target.value;
    console.log(this.details);
  }
  updateAssignedTo(e) {
    this.assignedto = e.target.value;
    console.log(this.assignedto);
  }

  addAssignee() {
    if(!this.props.userList.includes(this.assignedto)){
      alert('please type correct user name!')
      return;
    }
    let newassignedMember = JSON.parse(JSON.stringify(this.state.assignedMember));
    newassignedMember.push(this.assignedto);
    console.log(newassignedMember);
    this.setState({assignedMember: newassignedMember});
  }

  updateDate(e) {
    this.date = e.target.value;
    console.log(this.date);
  }

  updatePriority(e) {
    this.priority = e.target.value;
    console.log(this.priority);
  }
  updateSubtaskVal(e) {
    this.subTaskVal = e.target.value;
  }

  addSubTasks() {
    let newSubTasks = JSON.parse(JSON.stringify(this.state.subTasks));
    newSubTasks.push(this.subTaskVal);
    console.log(newSubTasks);
    this.setState({subTasks: newSubTasks});
  }

  handleSave(){
    if(this.description === "" || this.details === "" || this.date === "" || this.state.assignedMember.length === 0 || this.state.subTasks.length === 0){
      alert("please fill the required field!");
      return;
    }
    let body = {
      description: this.description,
      details: this.details,
      dueDate: this.date,
      priority: this.priority,
      assigneeList: this.state.assignedMember,
      subTasks: this.state.subTasks
    };
    console.log(JSON.stringify(body));
    fetch('/task', {  
      method: 'POST', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(()=>{
      this.props.closePopup();
    })
    .catch(err => console.log(err));
  }

  render() {  
    console.log("popup rendering")
    const subTaskArr = [];
    for(let i = 0; i < this.state.subTasks.length ;i++){
      subTaskArr.push(<li key = {i}>{this.state.subTasks[i]}</li>)
    }
    const memberArr = [];
    for(let i = 0; i < this.state.assignedMember.length ;i++){
      memberArr.push(<li key = {i}>{this.state.assignedMember[i]}</li>)
    }
    return (  
      <div className='popup'>  
        <div className='popup_inner'>  
          <input id = "descriptionInput" type="text" name="inputBox" placeholder="Description" onChange={this.updateDescription}></input>
          <textarea id="detailsInput" type="text" name="inputBox" placeholder="Details" onChange={this.updateDetails}></textarea>
          <input type="date" name="inputBox" placeholder="Due Date" onChange={this.updateDate}></input><br/>
          <h5>Assign to</h5>
          <input type="text" name="inputBox" placeholder="Assign to" onChange={this.updateAssignedTo}></input>
          <button onClick={this.addAssignee}>Add</button>  
          <ul>
            {memberArr}
          </ul>
          <h5>Subtasks</h5>
          <input type="text" name="inputBox" placeholder="Subtasks" onChange={this.updateSubtaskVal}></input>
          <button onClick={this.addSubTasks}>Add</button>  
          <ul>
            {subTaskArr}
          </ul>
          <h5>Priority</h5>
          <input type="range" min="1" max="10" defaultValue="1" className="slider" onChange={this.updatePriority}></input><br/>
          <button onClick={this.handleSave}>Save</button>  
        </div>  
      </div>  
    );  
  }  
}  

export default AddTaskPopup ;