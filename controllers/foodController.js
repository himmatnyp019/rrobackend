import foodModel from "../models/foodModels.js";
import fs from 'fs';


//add food items  
const addFood = async (req, res) => {
  try {
    // Access image filenames safely
    const image1 = req.files.image?.[0]?.filename || null;
    const image2 = req.files.image2?.[0]?.filename || null;
    const image3 = req.files.image3?.[0]?.filename || null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image1,    // main image
      image2: image2,   // second image
      image3: image3,   // third image
      discount:req.body.discount
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error: " + error.message });
  }
};


// get all food list
const listFood = async (req, res) => {
   try {
      const foods = await foodModel.find({});
      res.json({ success: true, data: foods, })
   } catch (error) {
      console.log(error)
      res.json({ success: true, message: "Error " + error })
   }
}


//remove food items from db
const removeFood = async (req, res) => {
  try {
    console.log('Request Body:', req.body.id);

    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // Delete image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log('File delete error:', err);
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed.' });
    
  } catch (error) {
    console.log('Error in removeFood:', error);
    res.status(500).json({ success: false, message: 'Failed to Delete' });
  }
};


export { addFood, listFood, removeFood }
