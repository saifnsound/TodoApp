var db = require('../models');

exports.getTodos = function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos);
        })
        .catch(function (err) {
            res.send(err);
        });
};

exports.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.status(201).json(newTodo);
        })
        .catch(function (err) {
            res.send(err);
        });
};

exports.getTodo = function (req, res) {
    db.Todo.findById(req.params.todoID)
        .then(function (foundTodo) {
            res.json(foundTodo);
        })
        .catch(function (err) {
            res.send(err);
        });
};

exports.updateTodo = function (req, res) {
    db.Todo.findByIdAndUpdate({
            _id: req.params.todoID
        }, req.body, {
            new: true
        })
        .then(function (updatedTodo) {
            res.json(updatedTodo);
        })
        .catch(function (err) {
            res.send(err);
        });
};

exports.deleteTodo = function (req, res) {
    db.Todo.findByIdAndRemove(req.params.todoID)
        .then(function () {
            res.send("Deleted!");
        })
        .catch(function (err) {
            res.send(err);
        });
};

module.exports = exports;