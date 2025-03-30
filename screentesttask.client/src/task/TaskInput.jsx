import { useState } from 'react';
import { addTask } from './api';
import '../App.css';

export default function TaskInput({ onTaskAdded }) {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskText.trim()) {
            alert("Увы, вы ввели пустую задачу");
            return;
        }

        const newTask = await addTask(taskText);
        onTaskAdded(newTask);
        setTaskText('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-input">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Введите новую задачу"
            />
            <button type="submit">Добавить</button>
        </form>
    );
}