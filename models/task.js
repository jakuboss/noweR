var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    task: {
        type: Number
    },
    zadanie: {
        type: Number
    },
    proba: {
        type: Number
    },
    amet: {
        type: Number
    },
    produkt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produkt'
    }
});

var taskModel = module.exports = mongoose.model('task', taskSchema);

module.exports.addTask = (task, cb) => {
    task.save((err, taskData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, taskData);
        }
    });
}

module.exports.getTask = (cb) => {
    taskModel.find((err, taskData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, taskData);
        }
    });
}

module.exports.removeTask = (id, cb) => {
    taskModel.deleteOne({
        '_id': id
    }, (err, taskData) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, taskData);
        }
    });
}