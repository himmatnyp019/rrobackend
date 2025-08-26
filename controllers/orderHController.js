
import userModel from "../models/userModels.js"
import historyModel from "../models/historyModel.js"
import fs from "fs"


export const addOrderHistory = async (req, res) => {
  try {

    const newHistory = new historyModel(
      {
        
        userId: req.body.uid,
        date: req.body.date,
        discount: req.body.discount,
        items: req.body.items,
        totalPrice: req.body.totalPrice,
        deliveryCharge: req.body.deliveryCharge,
        deliveryAddress: req.body.deliveryAddress,
        deliveredBy: req.body.deliveredBy
      }
    );
    await newHistory.save();

    res.status(200).json({ success: true, message: "history added" });
  } catch (err) {
    console.error("Error adding order history:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.json({ success: false, message: "Please log in your account." })
    }
    const user = await userModel.findById(userId);
    if (!user) {
      res.json({ success: false, message: "User not found. Please re-login." })

    }
    const historyData = await historyModel.find({ userId }) || [];
    const productIds = productID(historyData);
    res.json({ success: true, orderHistory: historyData, keys: productIds });

  } catch (error) {
    console.log("getHistory Error :", error)
    res.status(500).json({ success: false, message: "Failed to load order history data." })
  }
}

function productID(data) {
  let itemsArray = [];
  data.forEach(products => {
    products.items.forEach(item => {
      itemsArray.push(item.itemId);
    });
  });
  return itemsArray;
}
