document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const priority = document.getElementById('task-priority').value;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, priority })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Task created successfully!');
            loadTasks();
        } else {
            alert(`Task creation failed: ${data.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong!');
    }
});

async function loadTasks() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data); 
        if (response.ok) {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            data.tasks.forEach(task => addTaskToList(task)); 
        } else {
            alert(`Failed to load tasks: ${data.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong!');
    }
}

function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `<strong>title: </strong> ${task.title} <br><strong>description: </strong>  ${task.description} <br><strong>priority: </strong> ${task.priority} <br>`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task._id);
    listItem.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.onclick = () => updateTask(task._id);
    listItem.appendChild(updateButton);

    taskList.appendChild(listItem);
}

async function deleteTask(taskId) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to delete a task');
        return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    if (response.ok) {
        alert('Task deleted successfully');
        document.location.reload();
    } else {
        alert(data.error || 'Failed to delete task');
    }
}

async function updateTask(taskId) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const newPriority = prompt('Enter new priority:');
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to update a task');
        return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, description: newDescription, priority: newPriority })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Task updated successfully');
        document.location.reload();
    } else {
        alert(data.error || 'Failed to update task');
    }
}

loadTasks();
