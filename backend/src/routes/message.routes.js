import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getUserForSideBar,getmessagehistory,sendMessage } from "../controller/message.controller.js";
const router=Router();

router.get('/users',protectedRoute,getUserForSideBar);

router.get('/messgehistory/:id',protectedRoute,getmessagehistory);
router.post('/sendMessage/:id',protectedRoute,sendMessage);

export default router;