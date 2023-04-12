import Router from "express"
const router = Router()


router.route("/")
    .get((req,res)=>{
        res.send("in the exam")
    });

router.route("/:id")
    .get((req,res)=>{
        res.send("in the exam with id")
    })

export {router}