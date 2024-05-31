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

    loadState(); // Cargar el estado inicial desde el almacenamiento local
});

function loadState() {
    const state = JSON.parse(localStorage.getItem('taskState'));

    if (state) {
        const todoList = document.querySelector('#todo .task-list');
        const inProgressList = document.querySelector('#inProgress .task-list');
        const doneList = document.querySelector('#done .task-list');

        todoList.innerHTML = '';
        inProgressList.innerHTML = '';
        doneList.innerHTML = '';

        state.todo.forEach(taskText => {
            const task = document.createElement('li');
            task.textContent = taskText;
            task.className = 'task';
            todoList.appendChild(task);
        });

        state.inProgress.forEach(taskText => {
            const task = document.createElement('li');
            task.textContent = taskText;
            task.className = 'task';
            inProgressList.appendChild(task);
        });

        state.done.forEach(taskText => {
            const task = document.createElement('li');
            task.textContent = taskText;
            task.className = 'task';
            doneList.appendChild(task);
        });
        
        // Guardar el estado inicial del tablero Kanban en el almacenamiento local
        localStorage.setItem('taskState', JSON.stringify(state));
    }
}

function saveState() {
    const todoList = document.querySelector('#todo .task-list');
    const inProgressList = document.querySelector('#inProgress .task-list');
    const doneList = document.querySelector('#done .task-list');

    const state = {
        todo: Array.from(todoList.children).map(task => task.textContent),
        inProgress: Array.from(inProgressList.children).map(task => task.textContent),
        done: Array.from(doneList.children).map(task => task.textContent)
    };

    localStorage.setItem('taskState', JSON.stringify(state));
}
