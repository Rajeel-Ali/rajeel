
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
        taskInput.value = '';

        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
        });

        const completeBtn = listItem.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });
    }
});
