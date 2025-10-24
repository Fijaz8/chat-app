import { Router } from "express";
import { loginfun, logoutfun, signupfun,updatedfun,checkfun } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router=Router();
 
router.post("/signup",signupfun)

 router.post("/login",loginfun)
    
 router.post("/logout",logoutfun)

//updating the dp
router.put("/update-dp",protectedRoute,updatedfun)

router.get("/check",protectedRoute,checkfun)




export default router;

