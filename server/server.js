require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const taskController = require('./taskController.js');
const userController = require('./userController.js');

app.use(express.json()); // body parser 

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/',(req,res)=>{
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/task/:taskid', taskController.changeStatus, (req,res)=>{
  res.status(200).json(res.locals.addedTask);
});

app.post('/task', taskController.addTask, taskController.linkUserTask, taskController.addSubtasks, (req,res)=>{
  res.status(200).json(res.locals.addedTask);
});

app.get('/task/:user',taskController.getUsersTasks, (req,res)=>{
  res.status(200).json({tasks: res.locals.tasks});
});

app.get('/task/id/:id', taskController.getOneTask, taskController.getSubTasks, taskController.getAssignedMember, (req,res)=>{
  res.status(200).json({tasks: res.locals.detailedTask});
});

app.get('/task',taskController.getAllTasks, (req,res)=>{
  res.status(200).json({tasks: res.locals.tasks});
});

app.get('/user/:username', userController.getUserInfo, (req,res) =>{
  res.status(200).json(res.locals.data);
})

app.post('/user', userController.addUser, (req,res) => {
  res.status(200).json(res.locals.addedData);
});

app.get('/user', userController.getUsers, (req,res) =>{
  res.status(200).json({users: res.locals.users});
})

app.delete('/user/:username', userController.deleteUser, (req,res) => {
  res.sendStatus(200);
});


// app.delete('/movies/:name', movieContorller.deleteMovie, (req,res)=>{
    // 
// })
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`listenting on port ${PORT} ...`));