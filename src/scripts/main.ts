import '../styles/globals.css';
import 'iconify-icon';

const todoForm = document.querySelector('form');
const todoInput = document.querySelector<HTMLInputElement>('#todo-input');
const addTodoBtn = document.querySelector('#add-todo');
const todoList = document.querySelector('#todo-list');

let allTodos: string[] = [];

todoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

const addTodo = () => {
    const todoText = todoInput?.value.trim();
    if (todoText && todoText.length > 0) {
        allTodos.push(todoText);
        console.log(allTodos);
        if (todoInput) {
            todoInput.value = '';
        }
    }
};
