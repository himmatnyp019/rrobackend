import express from "express";
import multer from "multer";
import { logIn, registerUser,getUserInfo, getAllUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";


const userRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"profileImages",
    filename : (req,file,cb)=>{
       const cleanedName = file.originalname.replace(/\s+/g, '_');
        return cb(null, `${Date.now()}_${cleanedName}`);
    }
} )
const upload = multer({storage:storage})
userRouter.post("/register", upload.single("image"), registerUser);

userRouter.post("/login",upload.none(), logIn)
userRouter.get("/get",authMiddleware, getUserInfo)
userRouter.get("/get/all", getAllUser);

export default userRouter;