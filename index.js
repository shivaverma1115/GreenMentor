const express = require('express');
const { connection } = require('./config/db');

const app = express();
app.use(express.json()) ;

app.get('/', (req, res) => {
    return res.send({
        msg: "This is api base point"
    })
})

const { signupRouter } = require('./routes/signup.routes');
app.use('/signup', signupRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log('your db is connected');
    } catch (error) {
        console.log(error);
    }
    console.log('your app is running 8080 port');
})