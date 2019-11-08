const model = require('./pmModel.js');

let taskController = {};
// description	text	 
// details	text	 
// dueDate	date	 
// priority
//	category
taskController.addTask = (req,res,next) =>{
  console.log("task controller add task")
  let {description, details, dueDate, priority} = req.body;
  console.log(req.body);
  const query = `INSERT INTO tasks (description, details, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *;`
  const values = [description, details, dueDate, priority];
  model.query(query,values,(err, data) =>{
    if(err) {
      return next(err);
    }
    else{
      res.locals.addedTask = data.rows[0];
      console.log(res.locals.data);
      next();
    }
  });
}

taskController.getOneTask = (req,res,next)=>{
  let taskId = req.params.id;
  const query = `SELECT t.description, t.details, t.due_date, t.priority, t.status FROM tasks t WHERE t._id=${taskId};`
  model.query(query, null, (err,data)=>{
    if(err) return next(err);
    console.log(data.rows[0]);
    res.locals.detailedTask = data.rows[0];
    return next();
  })
}

taskController.getAssignedMember = (req,res,next)=>{
  let taskId = req.params.id;
  const query = `SELECT t.user_name FROM users_tasks t WHERE t.task_id=${taskId}`
  model.query(query, null, (err,data)=>{
    if(err) return next(err);
    console.log(data.rows[0]);
    res.locals.detailedTask.users = data.rows;
    return next();
  })
}

taskController.getSubTasks = (req,res,next)=>{
  let taskId = req.params.id;
  const query = `SELECT s.description, s.is_done FROM subtasks s WHERE s.task_id=${taskId};`
  model.query(query, null, (err,data)=>{
    if(err) return next(err);
    res.locals.detailedTask.subtasks = data.rows;
    return next();
  })
}
// user_id	integer	 
// task_id	integer	 
// taskCategories_id

taskController.linkUserTask = (req, res, next)=>{
  let {assigneeList} = req.body;
  let taskId = res.locals.addedTask._id;
  let query = `INSERT INTO users_tasks (user_name, task_id) VALUES`;
  for(let i = 0; i < assigneeList.length ; i++){
    query += `('${assigneeList[i]}', ${taskId})`;
    if(i !== assigneeList.length - 1) query += ',';
  }
  query += ' RETURNING *;';
  model.query(query,null,(err, data) =>{
    if(err) {
      return next(err);
    }
    else{
      res.locals.data = data.rows[0];
      next();
    }
  });
}

taskController.addSubtasks = (req,res,next)=>{
  if(req.body.subTasks.length ===0) return next(); //dont add subtasks if there is none
  let {subTasks} = req.body;
  let taskId = res.locals.addedTask._id;
  let query = `INSERT INTO subtasks (description, task_id) VALUES`;
  for(let i = 0; i < subTasks.length ; i++){
    query += `('${subTasks[i]}', ${taskId})`;
    if(i !== subTasks.length - 1) query += ',';
  }
  query += ' RETURNING *;';
  model.query(query,null,(err, data) =>{
    if(err) {
      return next(err);
    }
    else{
      res.locals.data = data.rows[0];
      next();
    }
  });
}

taskController.getUsersTasks = (req,res,next) =>{
  console.log('taskController.getUsersTasks');
  let username = req.params.user;
  const query = `SELECT ut.user_name, t._id, t.description, t.due_date, t.priority, t.status  FROM users_tasks ut INNER JOIN tasks t ON ut.task_id=t._id WHERE ut.user_name='${username}';`
  model.query(query,null,(err, data) =>{
    if(err) {
      console.log(err);
      return next(err);
    }
    else{
      //console.log(data.rows);
      res.locals.tasks = data.rows;
      return next();
    }
  });
}

taskController.getAllTasks = (req,res,next) =>{
  console.log('taskController.getUsersTasks');
  let username = req.params.user;
  const query = `SELECT ut.user_name, t._id, t.description, t.due_date, t.priority, t.status  FROM users_tasks ut INNER JOIN tasks t ON ut.task_id=t._id;`
  model.query(query,null,(err, data) =>{
    if(err) {
      console.log(err);
      return next(err);
    }
    else{
      //console.log(data.rows);
      res.locals.tasks = data.rows;
      return next();
    }
  });
}
taskController.changeStatus = (req,res,next)=>{
  let taskId = req.params.taskid;
  let newStatus= req.query.status;
  let query = `UPDATE tasks set status=${newStatus} WHERE _id=${taskId};`
  model.query(query,null,(err, data) =>{
    if(err) {
      console.log(err);
      return next(err);
    }
    else{
      //console.log(data.rows);
      res.locals.tasks = data.rows;
      return next();
    }
  });
}


module.exports = taskController;