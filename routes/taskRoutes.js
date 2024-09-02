const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskControllers');
const authorize = require('../middlewares/authorizationMW');


router.post('/', authorize('user'), taskControllers.createTask);
router.get('/', authorize('user'), taskControllers.loadTasks);
router.get('/all', authorize('admin'), taskControllers.loadAllTasks);
router.put('/:id', authorize('user'), taskControllers.updateTask); // Allows both user and admin
router.delete('/:id', authorize('user'), taskControllers.deleteTask); // Allows both user and admin
router.put('/:id', authorize('admin'), taskControllers.updateTask); // Allows both user and admin
router.delete('/:id', authorize('admin'), taskControllers.deleteTask); // Allows both user and admin



module.exports = router;