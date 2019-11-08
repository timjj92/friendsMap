import React, { Component } from 'react';
import MainContainer from './container/mainContainer.jsx';

class App extends Component {
  constructor(props,context){
    super(props);
    this.state = {
      currentPage: 'auth',
      currentUser:{},
      usersArr: [],
    };
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(e){
    let userName = e.target.innerHTML;
    fetch(`/user/${userName}`)
    .then(data => data.json())
    .then(data =>{
      let newState = {
        currentPage: 'main',
        currentUser:{
          username: data.username,
          lastName: data.last_name,
          firstName: data.first_name,
          email: data.email,
          isAdmin: data.is_admin,
          jobTitle:data.job_title
        }
      }
      this.setState(newState);
    })

  }

  componentDidMount(){
    fetch("/user")
    .then(data => data.json())
    .then(data =>{
      //console.log(data);
      let arr = [];
      for(let i = 0; i < data.users.length;i ++){
        arr.push(data.users[i].username);
      }
      this.setState({usersArr: arr});
    })
  }

  render(){
    if(this.state.currentPage === 'auth'){
      let linkArr = [];
      // console.log(this.state.usersArr);
      for(let i = 0; i < this.state.usersArr.length; i++){
        // console.log(this.state.usersArr[i]);
        // // linkArr.push(<a key={i} onClick={()=>{changeUser()}}>{this.state.userArr[i]}</a>)
        linkArr.push(<p key ={i} id="userNames" onClick={this.changeUser}>{this.state.usersArr[i]}</p>)
      }
      return (
        <div id='auth'>
          {linkArr}
        </div>
      )
    }
    else if(this.state.currentPage === 'main'){
      // console.log(this.state.currentUser);
      return(
        <div>
          <MainContainer userInfo={this.state.currentUser} usersArr={this.state.usersArr}/>
        </div>
      )
    }
  }
}

export default App;
