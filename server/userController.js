const model = require('./pmModel.js');

let userController = {};
//username	text	 
// is_admin	boolean	 
// email	text	 
// first_name	text	 
// last_name	text	 
// job_title
userController.addUser = (req,res,next) => {
  console.log(req.body);
  let {username, is_admin, email, first_name, last_name, job_title} = req.body;
  const query = `INSERT INTO users(username, is_admin, email, first_name, last_name, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  const values = [username, is_admin, email, first_name, last_name, job_title];
  model.query(query, values, (err,data)=>{
    if(err) return next(err);
    res.locals.addedData = data.rows[0];
    return next();
  })
}

userController.getUsers = (req,res,next) =>{
  const query = `SELECT users.username FROM users`;
  model.query(query,null, (err,data) =>{
    if(err) return next(err);
    res.locals.users = data.rows;
    return next();
  })
}

userController.getUserInfo = (req,res,next)=>{
  let userName = req.params.username;
  const query = `SELECT * FROM users WHERE users.username='${userName}';`;
  model.query(query,null, (err,data) =>{
    if(err) return next(err);
    res.locals.data = data.rows[0];
    return next();
  })
}

userController.getUserId = (req,res,next)=>{
  let userName = req.params.user;
  const query = `SELECT u._id FROM users u WHERE u.username='${userName}';`
  model.query(query,null, (err,{rows}) =>{
    if(err) return next(err);
    res.locals.userId = rows[0]._id;
    console.log(res.locals.userId);
    return next();
  })
}

userController.deleteUser = (req,res,next) => {
  let userName = req.params.username;
  console.log(userName);
  const query = `DELETE FROM users WHERE users.username='${userName}';`
  model.query(query, null, (err,data)=>{
    if(err) return next(err);
    res.locals.addedData = data.rows[0];
    return next();
  })
}

module.exports = userController;