import React from 'react';
// description	text	 
// details	text	 
// due_date	date	 
// priority	integer	 
// category


const taskDisplay = (props) => {
  console.log(props.info);
  return (
    <div id ="taskBox" onClick={() => props.popup(props.info._id)}>
      <p>{props.info.description} </p>
    </div>
  )
};

export default taskDisplay;