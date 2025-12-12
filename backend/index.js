import express, { Router } from 'express'
import cors from 'cors'
import userRouter from './src/routes/userRouter.js'
const app = express()
app.use(cors())
app.use(express.json())

app.use('/', userRouter)
app.listen(8000,()=>{
    console.log('server listing on port 8000');
    
})

