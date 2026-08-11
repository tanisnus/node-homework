const {taskSchema, patchTaskSchema} = require('../validation/taskSchema');
const prisma = require("../db/prisma");

const create = async (req, res, next) => {
    if (!req.body) req.body = {};

    const {error, value} = taskSchema.validate(req.body, {abortEarly: false});
    if (error) return res.status(400).json({message: error.message});

    const { title, isCompleted } = value;

    let task = null;
    try {
        task = await prisma.task.create({
            data: {
                title,
                isCompleted,
                userId: global.user_id,
            },
            select: { id: true, title: true, isCompleted: true },
        });
    } catch (err) {
        return next(err);
    }

    res.status(201).json(task);
}


const index = async (req, res) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId: global.user_id,
        },
        select: { title: true, isCompleted: true, id: true },
    });

    if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(tasks);
}


const show = async (req, res, next) => {
    const id = parseInt(req.params?.id);

    if (isNaN(id)) {
        return res.status(400).json({message: 'Invalid task id'});
    }

    try {
        const task = await prisma.task.findUnique({
            where: {
                id,
                userId: global.user_id,
            },
            select: { title: true, isCompleted: true, id: true },
        });

        if (!task) {
            return res.status(404).json({ message: "The task was not found." });
        }

        res.status(200).json(task);
    } catch (err) {
        if (err.code === "P2025") {
            return res.status(404).json({ message: "The task was not found." });
        }
        return next(err);
    }
}

const update = async (req, res, next) => {
    if (!req.body) req.body = {};
    const {error, value} = patchTaskSchema.validate(req.body, {abortEarly: false});

    if (error) return res.status(400).json({message: error.message});

    const id = parseInt(req.params?.id);

    if (isNaN(id)) {
        return res.status(400).json({message: 'Invalid task id'});
    }

    try {
        const task = await prisma.task.update({
            data: value,
            where: {
                id,
                userId: global.user_id,
            },
            select: { title: true, isCompleted: true, id: true },
        });
        res.status(200).json(task);
    } catch (err) {
        if (err.code === "P2025") {
            return res.status(404).json({ message: "The task was not found." });
        }
        return next(err);
    }
}

const deleteTask = async (req, res, next) => {
    const id = parseInt(req.params?.id);

    if (isNaN(id)) {
        return res.status(400).json({message: 'Invalid task id'});
    }

    try {
        const task = await prisma.task.delete({
            where: {
                id,
                userId: global.user_id,
            },
            select: { title: true, isCompleted: true, id: true },
        });
        res.status(200).json(task);
    } catch (err) {
        if (err.code === "P2025") {
            return res.status(404).json({ message: "The task was not found." });
        }
        return next(err);
    }
}

module.exports = {create, index, show, update, deleteTask}
