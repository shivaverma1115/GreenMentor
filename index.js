const express = require('express');
const { connection } = require('./config/db');


const app = express();
app.use(express.json()) ;

const cors = require('cors') ;
app.use(cors({
    origin:'*'
}))

const { baseRoute } = require('./routes/baseUrl.route');
app.use('/', baseRoute);

const { signupRouter } = require('./routes/signup.routes');
app.use('/signup', signupRouter);

const { loginRoute } = require('./routes/login.route');
app.use('/login', loginRoute);

// const {authentication} = require('./middleware/authentication.middleware') ;
// app.use(authentication)

const port = process.env.PORT ;
app.listen(port, async () => {
    try {
        await connection;
        console.log('your db is connected');
    } catch (error) {
        console.log(error);
    }
    console.log(`your app is running ${port} port`);
})