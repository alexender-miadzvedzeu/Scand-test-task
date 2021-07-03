const fs = require('fs');

function create_ID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

module.exports = app => {

    app.get('/tasks', (req, res) => {
        try {
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                const tasks = JSON.parse(data);
                res.send(tasks);
            })
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/tasks', (req, res) => {
        try {
            //get data from DB.json
            let dataFromDB = {};
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                dataFromDB = JSON.parse(data);
                
                //format current data
                const date = new Date();
                const publishDate = () => {
                    if (date.getDate() < 10 && date.getMonth() < 10) {
                        return `0${date.getDate()}-0${date.getMonth()}-${date.getFullYear()}`;
                    } else if (date.getDate() < 10 && date.getMonth() >= 10) {
                        return `0${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                    } else if (date.getDate() >= 10 && date.getMonth() < 10) {
                        return `${date.getDate()}-0${date.getMonth()}-${date.getFullYear()}`
                    }
                }

                //make newTask obj
                const newTask = {
                    "id": create_ID(),
                    "title": req.body.title,
                    "description": req.body.description,
                    "publishDate": publishDate(),
                    "assignee": req.body.assignee,
                    "currentField": "open"
                }

                //update dataFromDB obj
                dataFromDB.tasks.push(newTask);

                //rewrite DB.json
                fs.writeFile('DB.json', JSON.stringify(dataFromDB), 'utf8', err => {
                    if (err) throw err;
                    res.sendStatus(200);
                })
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.put('/tasks', (req, res) => {
        try {
            //get data from DB.json
            let dataFromDB = {};
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                dataFromDB = JSON.parse(data);
                
                //updated newTask obj
                const updatedTask = req.body;
                let updatedData = {...dataFromDB};
                updatedData.tasks = dataFromDB.tasks.map(task => {
                    if (task.id === updatedTask.id) {
                        return task = updatedTask;
                    } else {
                        return task;
                    }
                });

                //rewrite DB.json
                fs.writeFile('DB.json', JSON.stringify(updatedData), 'utf8', err => {
                    if (err) throw err;
                    res.sendStatus(200);
                })
                
            });
        } catch (error) {
            console.log(error);
        }
    });

    app.delete('/tasks', (req, res) => {
        try {
            //get data from DB.json
            let dataFromDB = {};
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                dataFromDB = JSON.parse(data);

                for (let i = 0; i < dataFromDB.tasks.length; i++) {
                    if (req.body.id === dataFromDB.tasks[i].id) {
                        dataFromDB.tasks.splice(i, 1);
                    }
                }

                //rewrite DB.json
                fs.writeFile('DB.json', JSON.stringify(dataFromDB), 'utf8', err => {
                    if (err) throw err;
                    res.sendStatus(200);
                })
                
            });
        } catch (error) {
            console.log(error);
        }
    });
}