import express from "express";
import { addFood, listFood, removeFood, updateItem} from "../controllers/foodController.js";
import multer from "multer"

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb)=>{
        const cleanedName = file.originalname.replace(/\s+/g, '_'); 
       return cb(null, `${Date.now()}_${cleanedName}`);   
    }
})
const upload = multer({storage:storage})
foodRouter.post("/add", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 }
]), addFood);

foodRouter.get("/list",listFood)
foodRouter.post("/remove", removeFood)

foodRouter.post("/update", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 }
]), updateItem);


export default foodRouter;