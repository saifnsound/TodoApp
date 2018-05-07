$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function () {
        console.log(1);
        updateTodo($(this));
    });

    $('.list').on('click', 'span', function (e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });
});

function addTodos(todos) {
    todos.forEach(function (todo) {
        addtodo(todo);
    });
}

function addtodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    var usrInput = $('#todoInput').val();
    $.post("/api/todos", {
            name: usrInput
        })
        .then(function (todo) {
            $('#todoInput').val('');
            addtodo(todo);
        });
}

function removeTodo(todo) {
    var id = todo.data('id');
    var url = '/api/todos/' + id;
    $.ajax({
            method: 'DELETE',
            url: url
        })
        .then(function () {
            todo.remove();
        });
}

function updateTodo(todo) {
    var id = todo.data('id');
    var url = '/api/todos/' + id;
    var isDone = !todo.data('completed');
    var updateData = {
        completed: isDone
    };
    $.ajax({
            method: 'PUT',
            url: url,
            data: updateData
        })
        .then(function (param) {
            todo.toggleClass("done");
            todo.data('completed', isDone);
        });
}