import Router from "express"
import {router as articles} from "./articles.js"
import {router as trending} from "./trending.js"
import {router as interview} from "./interview.js"
import {router as exam} from "./exam.js"
const router = Router()

const resp = (app) =>{
    app.use("/user",(req,res)=>{
        res.send("hello world in user")
    })
    app.use("/articles",articles)
    app.use("/trending",trending)
    app.use("/interview",interview)
    app.use("/exam",exam)
    app.use("/",(req,res)=>{
        res.send("hello world")
    })
}

export default resp