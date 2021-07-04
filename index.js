const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors');
const fUpload = require('express-fileupload');
const router = require('./routes/mainRouter');
const path = require('path');
const errHandler = require('./middleware/errHandling');
const ejs = require('ejs');
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(fUpload());
app.use(express.json());
app.use('/api', router);
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(errHandler);


app.get('/', (req, res) => {
    // res.status(200).json({text: 'Server is working'})
    res.render('index');
})

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`[Server working...  port:${PORT}]`));
    } catch(e) {
        console.log(e);
    }
}

start();




