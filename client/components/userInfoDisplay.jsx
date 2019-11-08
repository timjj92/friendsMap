import React from 'react';

const userInfoDisplay = (props) => {
  console.log(props.info);
  let arr = [];
  arr.push(<h3>{props.info.username}</h3>);
  arr.push(<h3>Name: {props.info.firstName} {props.info.lastName}</h3>);
  arr.push(<h3>Email: {props.info.email}</h3>);
  arr.push(<h3>Position: {props.info.jobTitle}</h3>);
  
  return (
    <div id= "userInfo">
      {arr}
    </div>
  )
};

export default userInfoDisplay;