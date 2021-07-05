const fs = require('fs');

module.exports = app => {

    app.post('/fields', (req, res) => {
        try {
            //get data from DB.json
            if (!req.body.title) {
                res.sendStatus(400);
                return;
            }
            let dataFromDB = {};
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                dataFromDB = JSON.parse(data);
                
                dataFromDB.fields.push(req.body.title);

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

    app.put('/fields', (req, res) => {
        try {
            //get data from DB.json
            
            let dataFromDB = {};
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                dataFromDB = JSON.parse(data);
                
                const prevName = req.body.prevName;
                const index = dataFromDB.fields.indexOf(prevName);
                if (index !== -1) {
                    dataFromDB.fields[index] = req.body.name;
                } else {
                    res.sendStatus(400);
                    return;
                }

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

    app.delete('/fields/:name', (req, res) => {
        try {
            //get data from DB.json
            let dataFromDB = {};
            fs.readFile('DB.json', (err, data) => {
                if (err) throw err;
                dataFromDB = JSON.parse(data);

                const prevName = req.params.name;

                const index = dataFromDB.fields.indexOf(prevName);
                if (index !== -1) {
                    dataFromDB.fields.splice(index, 1);
                } else {
                    resp.sendStatus(400);
                    return;
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
