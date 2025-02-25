import '../styles/globals.css';
import 'iconify-icon';

const todoForm = document.querySelector('form');
const todoInput = document.querySelector<HTMLInputElement>('#todo-input');
const todoList = document.querySelector('#todo-list');

let allTodos: { text: string; completed: boolean }[] = getTodos();
updateTodoList();

todoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput?.value.trim();
    if (todoText && todoText.length > 0) {
        const todoObject: {
            text: string;
            completed: boolean;
        } = {
            text: todoText,
            completed: false,
        };
        allTodos.push(todoObject);
        saveTodos();
        updateTodoList();
        if (todoInput) {
            todoInput.value = '';
        }
    }
});

function updateTodoList() {
    if (todoList) {
        todoList.innerHTML = '';
        allTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoList.appendChild(todoItem);
        });
    }
}

function createTodoItem(
    todo: {
        text: string;
        completed: boolean;
    },
    index: number
) {
    const todoLI = document.createElement('li');
    todoLI.className = 'flex items-center gap-3 mb-3';
    todoLI.innerHTML = `<input type="checkbox" id="todo-${index}" class="peer
                    accent-indigo-500 cursor-pointer hover:accent-indigo-400
                    h-4 w-4" />
                    <label for="todo-${index}" class="peer-checked:line-through cursor-pointer">${todo.text}</label>
                    <button id="delete-btn" class="ms-auto leading-0
                    cursor-pointer hover:text-red-500 duration-300">
                        <iconify-icon icon="material-symbols:delete-rounded" width="22" height="22"></iconify-icon>
                    </button>`;

    const deleteBtn = todoLI.querySelector('#delete-btn');
    deleteBtn?.addEventListener('click', () => {
        deleteTodo(index);
    });
    const checkbox = todoLI.querySelector('input');
    checkbox?.addEventListener('change', () => {
        allTodos[index].completed = checkbox.checked;
        saveTodos();
    });
    if (checkbox) {
        checkbox.checked = todo.completed;
    }
    return todoLI;
}

function deleteTodo(todoIndex: number) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

function getTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}
