import Router from "express"

const router = Router()

router.route("/")
    .get((req,res)=>{
        res.send("in trending")
    });

router.route("/:id")
    .get((req,res)=>{
        res.send("in trending with id")
    });

export {router}