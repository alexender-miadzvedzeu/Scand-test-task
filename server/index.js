const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
})

const PORT = 7777;

app.listen(PORT, (req, res) => {
    console.log(`API started at PORT: ${PORT}`);
})

require('./modules/tasks.js')(app);