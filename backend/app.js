// Main logic
import express from "express"
import resp from "./routes/index.js"
const app = express()

app.use(express.json())
resp(app)


app.listen(3000,()=>{
    console.log("the server is online")

})