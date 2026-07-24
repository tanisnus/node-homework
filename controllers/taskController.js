const taskCounter = (() => {
    let lastTaskNumber = 0;
    return () => {
        lastTaskNumber++;
        return lastTaskNumber;
    }
})();

const create = (req, res) => {
    const newTask = {
        id: taskCounter(),
        title: req.body.title,
        isCompleted: false,
        userId: global.user_id.email
    }

    global.tasks.push(newTask);
    const {userId, ...sanitizedTask} = newTask;
    res.status(201).json(sanitizedTask);
}

module.exports = {create}
