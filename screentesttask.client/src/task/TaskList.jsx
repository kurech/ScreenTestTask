import { useState, useEffect } from 'react';
import { getTasks } from './api';
import TaskInput from './TaskInput';
import TaskCard from './TaskCard';
import '../App.css';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, [activeTab]);

    const fetchTasks = async () => {
        let isDone;
        if (activeTab === 'completed') isDone = true;
        else if (activeTab === 'pending') isDone = false;

        const data = await getTasks(isDone);
        setTasks(data);
    };

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };

    const filteredTasks = tasks.filter(task => {
        if (activeTab === 'all') return true;
        if (activeTab === 'completed') return task.type === 1;
        if (activeTab === 'pending') return task.type === 0;
        return true;
    });

    return (
        <div className="task-app">
            <h1>Менеджер задач</h1>

            <TaskInput onTaskAdded={handleTaskAdded} />

            <div className="tabs">
                <button
                    onClick={() => setActiveTab('all')}
                    className={activeTab === 'all' ? 'active' : ''}
                >
                    Все задачи
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={activeTab === 'completed' ? 'active' : ''}
                >
                    Выполненные
                </button>
                <button
                    onClick={() => setActiveTab('pending')}
                    className={activeTab === 'pending' ? 'active' : ''}
                >
                    Не выполненные
                </button>
            </div>

            <div className="task-grid">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={handleTaskUpdated}
                            onDelete={handleTaskDeleted}
                        />
                    ))
                ) : (
                    <div>Нет задач</div>
                )}
            </div>
        </div>
    );
}