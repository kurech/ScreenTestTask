import { useState } from 'react';
import { updateTask, deleteTask } from './api';
import '../App.css';

export default function TaskCard({ task, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [taskType, setTaskType] = useState(task.type);

    const handleUpdateText = async () => {
        if (!editedText.trim()) {
            alert("Увы, вы ввели пустую задачу");
            return;
        }

        const updatedTask = await updateTask({
            Id: task.id,
            Text: editedText,
            Type: taskType
        });
        onUpdate(updatedTask);
        setIsEditing(false);
    };

    const handleUpdateType = async (newType) => {
        const updatedTask = await updateTask({
            Id: task.id,
            Text: task.text,
            Type: newType
        });
        onUpdate(updatedTask);
    };

    const handleDelete = async () => {
        const success = await deleteTask(task.id);
        if (success) onDelete(task.id);
    };

    return (
        <div className={`task-card`}>
            {isEditing ? (
                <>
                    <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button onClick={handleUpdateText}>Сохранить</button>
                </>
            ) : (
                <>
                    <span>{task.text}</span>
                    <span>{taskType === 1 ? 'Выполнена' : 'Не выполнена'}</span>
                    <input
                        id={`type-${task.id}`}
                        type="checkbox"
                        checked={taskType === 1}
                        title={`Отметить как ${taskType === 1 ? "невыполненная" : "выполненная"}`}
                        onChange={(e) => {
                            const newType = e.target.checked ? 1 : 0;
                            setTaskType(newType);
                            handleUpdateType(newType);
                        }}
                    />
                    <button onClick={() => setIsEditing(true)}>Редактировать</button>
                    <button onClick={handleDelete}>Удалить</button>
                </>
            )}
        </div>
    );
}