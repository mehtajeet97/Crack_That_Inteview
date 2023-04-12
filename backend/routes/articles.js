import Router from "express"

const router  = Router()


router.route("/")
    .get((req,res)=>{
        res.send("all articles")
});

router.route("/:id")
    .get((req,res)=>{
        res.send("article with an id")
    });

export default router
;