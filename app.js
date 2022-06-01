const express = require('express');

const app = express();
const connectDB = require('./db/connect')
require('dotenv').config()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorHandler');

//midlewares
app.use(express.json()); //to get the data of req.body

 
app.use('/api/v1/tasks',tasks);
app.use(notFound);//custome res for unknown urls
app.use(errorHandlerMiddleware);

 

// app.get('/',(req,res)=>{
//     res.send('TaskManager App');
// });

// //get all the tasks
// app.get('/api/v1/tasks', (req,res)=>{
//     res.send();
// });

// //add a task
// app.post('/api/v1/tasks', (req,res)=>{
//     res.send();
// });

// //get single task
// app.get('/api/v1/tasks/:id', (req,res)=>{
//     res.send();
// });

// //update a task
// app.patch('/api/v1/tasks/:id', (req,res)=>{
//     res.send();
// });

// //delete a task
// app.delete('/api/v1/tasks/:id', (req,res)=>{  
//     res.send();
// });


const port = 3000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listning port ${port}...`))
    } catch (error) {
        console.log(error);
    } 
}

start();
