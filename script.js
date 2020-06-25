'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');


const todoData = [
    
];

let storageData = JSON.parse(localStorage.getItem('todoData'));




const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    
    todoData.forEach(function(item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>';
                todoList.append(li);
                
            console.log(todoData[index]);
                if(item.completed) {
                    todoCompleted.append(li);
            } else {
                todoList.append(li);
            }
        
        const todoComplete = li.querySelector('.todo-complete');
        
        todoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
            // localStorage.setItem('todoData', 'JSON.stringify(todoData)');
        });
        
        const todoRemove = li.querySelector('.todo-remove');
        
        localStorage.setItem('todoData', JSON.stringify(todoData));
        
        todoRemove.addEventListener('click', function() {
            li.remove();
            todoData.splice(index, 1);
            render();
            localStorage.setItem('todoData', JSON.stringify(todoData));
        });
        
        
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false,
        };
        
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    }
});

let getLocaleStorageData = function() {
    if (todoData.length !==0) {
    todoData.length = 0;
    }
    let storageData = JSON.parse(localStorage.getItem("todoData"));
    storageData.forEach(function(item, index) {
        todoData.push(storageData[index]);
    });
};

getLocaleStorageData();

render();