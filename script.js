document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.querySelector('#todo .task-list');
    const inProgressList = document.querySelector('#inProgress .task-list');
    const doneList = document.querySelector('#done .task-list');

    new Sortable(todoList, {
        group: 'shared',
        animation: 150,
        onEnd: saveState
    });

    new Sortable(inProgressList, {
        group: 'shared',
        animation: 150,
        onEnd: saveState
    });

    new Sortable(doneList, {
        group: 'shared',
        animation: 150,
        onEnd: saveState
    });

    loadState();
});

function addTask(columnId) {
    const taskText = prompt('Enter task:');
    if (taskText === null || taskText.trim() === '') return;

    const task = document.createElement('div');
    task.className = 'task';
    task.textContent = taskText;

    document.querySelector(`#${columnId} .task-list`).appendChild(task);
    saveState();
}

function saveState() {
    const columns = ['todo', 'inProgress', 'done'];
    const state = columns.reduce((acc, column) => {
        acc[column] = Array.from(document.querySelectorAll(`#${column} .task`)).map(task => task.textContent);
        return acc;
    }, {});

    localStorage.setItem('kanbanState', JSON.stringify(state));
}

function loadState() {
    const state = JSON.parse(localStorage.getItem('kanbanState'));
    if (!state) return;

    Object.keys(state).forEach(column => {
        const columnElement = document.querySelector(`#${column} .task-list`);
        columnElement.innerHTML = '';
        state[column].forEach(taskText => {
            const task = document.createElement('div');
            task.className = 'task';
            task.textContent = taskText;
            columnElement.appendChild(task);
        });
    });
}
