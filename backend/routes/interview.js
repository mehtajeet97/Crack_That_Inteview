import Router from "express"

const router = Router()

router.route("/")
    .get((req,res)=>{
        res.send("in the interview")
    });
export {router}