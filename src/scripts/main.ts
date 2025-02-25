import '../styles/globals.css';
import 'iconify-icon';

const todoForm = document.querySelector('form');
const todoInput = document.querySelector<HTMLInputElement>('#todo-input');
const addTodoBtn = document.querySelector('#add-todo');
const todoList = document.querySelector('#todo-list');

let allTodos: string[] = [];

todoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput?.value.trim();
    if (todoText && todoText.length > 0) {
        allTodos.push(todoText);
        updateTodoList();
        if (todoInput) {
            todoInput.value = '';
        }
    }
});

const updateTodoList = () => {
    if (todoList) {
        todoList.innerHTML = '';
        allTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoList.appendChild(todoItem);
        });
        console.log(allTodos);
    }
};

const createTodoItem = (todo: string, index?: number) => {
    const todoLI = document.createElement('li');
    todoLI.className = 'flex items-center gap-3 mb-3';
    todoLI.innerHTML = `<input type="checkbox" id="todo-${index}" class="peer
                    accent-indigo-500 cursor-pointer hover:accent-indigo-400
                    h-4 w-4" />
                    <label for="todo-${index}" class="peer-checked:line-through cursor-pointer">${todo}</label>
                    <button id="delete-btn" class="ms-auto leading-0
                    cursor-pointer hover:text-red-500 duration-300">
                        <iconify-icon icon="material-symbols:delete-rounded" width="22" height="22"></iconify-icon>
                    </button>`;

    return todoLI;
};
