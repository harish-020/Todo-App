import pgClient from "../config/db.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.js";
// import bcrypt from 'bcrypt'
// import encryt from 'encrypt'
import dotenv from "dotenv";
dotenv.config()
const userRouter = Router()

userRouter.post('/signup', async (req,res)=>{
    const {email,password} = req.body
    const newUser = await pgClient.query(
        'INSERT INTO users(email,password) VALUES ($1,$2) RETURNING *',
        [email, password]
    )
    res.json(newUser.rows[0])
})
userRouter.post('/signin', async(req,res)=>{
    const {email,password} = req.body
    const adminResult = await pgClient.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const admin = adminResult.rows[0];

    if(password === admin.password){
        const token =jwt.sign(
            {id:admin.id,email:admin.email},
            process.env.JWT_SECRET,
            {expiresIn:'7D'}
        )

    return res.json({
        message:"login sucessfull",
        token,
        admin:{
            id:admin.id,
            email:admin.email
        }
    })
}

})
userRouter.post('/add', authMiddleware, async(req,res)=>{
    const {title,description} = req.body
    const userId = req.user.id

    const newTodo=await pgClient.query(
        'INSERT INTO todos(user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [userId, title, description]
    );
        res.json(newTodo.rows[0]);

})
userRouter.get('/get', authMiddleware,async (req,res)=>{
    const userId = req.user.id
    const result = await pgClient.query(
        "SELECT * FROM todos WHERE user_id = $1",
        [userId]
    )
    const todoList = result.rows;
    res.json(todoList)
    
})
userRouter.delete('/delete', authMiddleware, async(req,res)=>{
    const {todoId} = req.body
    const userId = req.user.id
    const deletd = await pgClient.query(
        "DELETE FROM todos WHERE Id = $1 AND user_id = $2 RETURNING *",
        [todoId, userId]
    )
    if(deletd){
        res.json("todo deleted")
    }
})
export default userRouter