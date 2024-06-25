import express from 'express';
import Task from '../models/Task';
import TaskData from '../Mock/Data'

const tasksRouter = express.Router();

tasksRouter.post('/tasks', (req, res)=>{
    try {
        if(typeof req.body === 'object' && Object.values(req.body).length=== 0){
            throw new Error('😓 Dados invalidos, nao sera possivel gravar a tarefa.');
        }
        const task: Task = {
            id: +req.body.id,
            descricao: req.body.descricao,
            status: req.body.status ?? 'A fazer'
        }
        TaskData.Tasks.push(task);
        const savedTask = TaskData.Tasks.find(dbTask=>dbTask.id === task.id);
        if(typeof savedTask === 'object' && Object.values(savedTask).length === 0){
            throw new Error('😭 Erro ao gravar tarefa.');
        }
        res.status(200).json("✅ Tarefa adicionada com sucesso!");
    } catch (error) {
        res.status(500).json(error);
    }
    
});

tasksRouter.get('/tasks', (req,res)=>{
    const tasks: Task[] = TaskData.Tasks;
    res.status(200).json(tasks);
});

tasksRouter.get('/tasks/:id', (req,res)=>{
    try {
        const id: number = +req.params.id;
        const task = TaskData.Tasks.find(dbTask=>dbTask.id === id);
        if(typeof task === 'object' && Object.values(task).length === 0){
            throw new Error('🔍 Nenhuma tarefa encontrada para o id informado.');
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json(error);
    }
});

tasksRouter.put('/tasks/:id', (req,res)=>{
    try {
        const id: number = +req.params.id;
        const task = TaskData.Tasks.find(dbTask=>dbTask.id === id);
        if(typeof task === 'object' && Object.values(task).length === 0){
            throw new Error('🔍 Nenhuma tarefa encontrada para o id informado.');
        }
    
        const newEntry: Task = {
            id: id,
            descricao: req.body.descricao ?? task?.descricao,
            status: req.body.status ?? task?.status
        } 
    
        const taskIndex = TaskData.Tasks.findIndex(dbTask=>dbTask.id === id);
        TaskData.Tasks.splice(taskIndex, 1, newEntry);

        res.status(200).json('✅ Tarefa atualizada com sucesso!')
    } catch (error) {
        res.status(404).json(error);
    }
});

tasksRouter.delete('/tasks/:id', (req,res)=>{
    try {
        const id: number = +req.params.id;
        const task = TaskData.Tasks.find(dbTask=>dbTask.id === id);
        if(typeof task === 'object' && Object.values(task).length === 0){
            throw new Error('🔍 Nenhuma tarefa encontrada para o id informado.');
        }

        const taskIndex = TaskData.Tasks.findIndex(dbTask=>dbTask.id === id);
        TaskData.Tasks.splice(taskIndex, 1);

        res.status(200).json('✅ Tarefa removida com sucesso!')
    } catch (error) {
        res.status(404).json(error);
    }
});

export default tasksRouter;