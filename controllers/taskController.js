const {taskSchema, patchTaskSchema} = require('../validation/taskSchema');

const taskCounter = (() => {
    let lastTaskNumber = 0;
    return () => {
        lastTaskNumber++;
        return lastTaskNumber;
    }
})();



const create = (req, res) => {


    if (!req.body) req.body = {};

    const {error, value} = taskSchema.validate(req.body, {abortEarly: false});
    if (error) return res.status(400).json({message: error.message});




    const newTask = {
        id: taskCounter(),
        userId: global.user_id.email,
        ...value
    };

    global.tasks.push(newTask);
    const {userId, ...sanitizedTask} = newTask;
    res.status(201).json(sanitizedTask);
}


const index = (req, res) => {


    const userTasks = global.tasks.filter(task => task.userId === global.user_id.email);

    if (userTasks.length === 0) {
        return res.status(404).json({message: 'No tasks found'});
    }


    const sanitizedTasks = userTasks.map(task => {
        const {userId, ...sanitizedTask} = task;
        return sanitizedTask;
    })

    res.status(200).json(sanitizedTasks);

    
}


const show = (req, res) => {

    const taskId = parseInt(req.params?.id);

    if (isNaN(taskId)) {
        return res.status(400).json({message: 'Invalid task id'});

    }

    const task = global.tasks.find(task => task.id === taskId && task.userId === global.user_id.email);

    if (!task) {
        return res.status(404).json({message: 'Task not found'});
    }

    const {userId, ...sanitizedTask} = task;
    res.status(200).json(sanitizedTask);

}

const update = (req, res) => {

    if (!req.body) req.body = {};
    const {error, value} = patchTaskSchema.validate(req.body, {abortEarly: false});

    if (error) return res.status(400).json({message: error.message});

    const taskId = parseInt(req.params?.id);

    const task = global.tasks.find(task => task.id == taskId && task.userId === global.user_id.email);

    if (!task) {
        return res.status(404).json({message: 'Task not found'});
    }


    Object.assign(task, value);
    const {userId, ...sanitizedTask} = task;
    res.status(200).json(sanitizedTask);

}

const deleteTask = (req, res) => {

    const taskId = parseInt(req.params?.id);

    if (isNaN(taskId)) {
        return res.status(400).json({message: 'Invalid task id'});
    }

    const index = global.tasks.findIndex(task => task.id == taskId && task.userId === global.user_id.email);

    if (index === -1) {
        return res.status(404).json({message: 'Task not found'});
    }

    const { userId, ...sanitizedTask} = global.tasks[index];

    global.tasks.splice(index, 1);

    res.status(200).json(sanitizedTask);



}

module.exports = {create, index, show, update, deleteTask}
