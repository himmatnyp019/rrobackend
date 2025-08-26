import { addReview,removeReview,getReview } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/auth.js";
import express  from "express"
import multer from "multer";

const reviewRoute = express.Router();


//code for image storage
const storage = multer.diskStorage({
    destination:"reviewsImages",
    filename : (req,file,cb)=>{
       const cleanedName = file.originalname.replace(/\s+/g, '_');
        return cb(null, `${Date.now()}_${cleanedName}`);
    }
} )
const upload = multer({storage:storage})
reviewRoute.post("/add", upload.single("image"), authMiddleware, addReview);
reviewRoute.post("/get", authMiddleware, getReview);
reviewRoute.post("/delete", authMiddleware, removeReview);

export default reviewRoute;
