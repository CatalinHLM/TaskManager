const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');

router.get('/getByEmail', auth.authenticateToken, (req, res) => {
  const email = res.locals.email;

  const query = 'SELECT * FROM tasks WHERE user_id = (SELECT id FROM users WHERE email = ?)';
  const values = [email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch tasks' });
    }
    return res.status(200).json(results);
  });
});


router.post('/createByEmail', auth.authenticateToken, (req, res) => {
  const email = res.locals.email;
  const task = req.body;

  const query = 'INSERT INTO tasks (user_id, name, description, due_date) VALUES ((SELECT id FROM users WHERE email = ?), ?, ?, ?)';
  const values = [email, task.name, task.description, task.due_date];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create task' });
    }
    return res.status(200).json({ message: 'Task created successfully' });
  });
});


// Update a task by user's email
router.put('/updateTask', auth.authenticateToken, (req, res) => {
  const email = res.locals.email; // User data obtained from authentication middleware
  const taskName = req.query.taskName;
  const updatedTask = req.body;

  const query = 'UPDATE tasks SET name = ?, description = ?, due_date = ? WHERE name = ? AND user_id = (SELECT id FROM users WHERE email = ?)';
  const values = [updatedTask.name, updatedTask.description, updatedTask.due_date, taskName, email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update task' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task updated successfully' });
  });
});
//by id
router.put('/updateTask', auth.authenticateToken, (req, res) => {
  const email = res.locals.email; // User data obtained from authentication middleware
  const taskId = req.query.taskID;
  const updatedTask = req.body;

  const query = 'UPDATE tasks SET name = ?, description = ?, due_date = ? WHERE id = ? AND user_id = (SELECT id FROM users WHERE email = ?)';
  const values = [updatedTask.name, updatedTask.description, updatedTask.due_date, taskId, email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update task' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task updated successfully' });
  });
});


// Delete a task by user's email
router.delete('/deleteTask', auth.authenticateToken, (req, res) => {
  const email = res.locals.email;
  const taskName = req.query.taskName; // Use req.query.taskName instead of req.params.taskId

  const query = 'DELETE FROM tasks WHERE name = ? AND user_id = (SELECT id FROM users WHERE email = ?)';
  const values = [taskName, email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete task' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  });
});

router.delete('/deleteTaskId', auth.authenticateToken, (req, res) => {
  const email = res.locals.email;
  const taskId= req.query.taskId; // Use req.query.taskName instead of req.params.taskId

  const query = 'DELETE FROM tasks WHERE Id = ? AND user_id = (SELECT id FROM users WHERE email = ?)';
  const values = [taskId, email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete task' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  });
});



module.exports = router;