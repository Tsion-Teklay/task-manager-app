async function loadAllTasks() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/tasks/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(response);
        if (response.ok) {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';
            data.tasks.forEach(task => {
                const div = document.createElement('div');
                div.innerHTML = `<strong> user: </strong>${task.userId} <br> 
                <strong> title: </strong>${task.title} <br>
                <strong> description: </strong>${task.description}<br>
                <strong> priority: </strong>${task.priority}`;

                usersList.appendChild(div);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteTask(task._id);
                usersList.appendChild(deleteButton);

                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';updateButton.onclick = () => updateTask(task._id);
                usersList.appendChild(updateButton);
   
            });
        } else {
            alert(`Failed to load tasks: ${data.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong!');
    }
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


loadAllTasks();

