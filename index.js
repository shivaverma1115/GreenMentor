const express = require('express');
const { connection } = require('./config/db');

const app = express();
app.use(express.json()) ;

const { baseRoute } = require('./routes/baseUrl.route');
app.use('/', baseRoute);

const { signupRouter } = require('./routes/signup.routes');
app.use('/signup', signupRouter);

const { loginRoute } = require('./routes/login.route');
app.use('/login', loginRoute);

app.listen(8080, async () => {
    try {
        await connection;
        console.log('your db is connected');
    } catch (error) {
        console.log(error);
    }
    console.log('your app is running 8080 port');
})