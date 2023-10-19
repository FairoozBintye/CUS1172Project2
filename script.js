document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("form").onsubmit = addTask;
    updateTaskList();
});

let tasks = [];

function addTask(event){
    event.preventDefault();

    const taskTitle = document.getElementById('input-box').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskStatus = document.querySelector('input[name="taskStatus"]:checked').value;

    const task = { title: taskTitle, priority: taskPriority, status: taskStatus };
    tasks.push(task);
    updateTaskList();

    document.getElementById('taskForm').reset();
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function toggleComplete(index) {
    tasks[index].status = (tasks[index].status === 'pending') ? 'completed' : 'pending';
    updateTaskList();
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeTask(index));
        removeBtn.classList.add('custom-button');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Mark as Complete';
        completeBtn.addEventListener('click', () => toggleComplete(index));
        completeBtn.classList.add('custom-button');

        li.textContent = `${task.title} (Priority: ${task.priority}, Status: ${task.status}) `;
        if (task.status === 'completed') {
            li.classList.add('completed');
            completeBtn.textContent = 'Undo Complete';
        } else {
            completeBtn.textContent = 'Mark as Complete';
        }

        li.appendChild(removeBtn);
        li.appendChild(completeBtn);
        taskList.appendChild(li);
        taskList.appendChild(document.createElement('br'));
    });
}
