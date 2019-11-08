import React from 'react';

const userInfoDisplay = (props) => {
  console.log(props.info);
  return (
    <div>
      <p id= "userNames">Username: {props.info.username} Name: {props.info.firstName} {props.info.lastName} Email: {props.info.email} Position: {props.info.jobTitle}</p>
    </div>
  )
};

export default userInfoDisplay;