// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const cors=require('cors')
const errorcontroller=require('./controllers/errorcontroller')
const { default: mongoose } = require('mongoose');
const todoItemRouter = require('./routes/todoItemRouter');
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use('/api/todo',todoItemRouter)
app.use(errorcontroller.pageNotFound)


const PORT=3001;
const DB_PATH='mongodb+srv://sharmarachit554_db_user:VQto3C7C1YTWVC1N@rachitdb.mxslh19.mongodb.net/todo?retryWrites=true&w=majority&appName=Rachitdb'
mongoose.connect(DB_PATH).then(()=>{
    console.log('mongoose connected')
  app.listen(PORT,()=>{
    console.log(`Server running on address http://localhost:${PORT}`)
  })
}
).catch(err =>{
  console.log("Error comes due to mongoose not connected",err)
})
