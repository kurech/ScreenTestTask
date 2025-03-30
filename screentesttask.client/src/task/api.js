const API_URL = 'https://localhost:7125/api/task';

export const getTasks = async (isDone) => {
    const url = isDone !== undefined ? `${API_URL}?isDone=${isDone}` : API_URL;
    const response = await fetch(url);
    return await response.json();
};

export const addTask = async (text) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(text)
    });
    return await response.json();
};

export const updateTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Id: task.Id,
            Text: task.Text,
            Type: task.Type,
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при обновлении задачи');
    }

    return await response.json();
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE'
    });
    return response.status === 204;
};