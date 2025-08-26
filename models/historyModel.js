import mongoose  from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: String,
    price: String,
    quantity: String,
    itemId:String
}, { _id: false });

const orderHistorySchema = new mongoose.Schema({
    date: String,
    userId:String,
    discount: Number,
    items: [orderItemSchema],
    totalPrice: String,
    deliveryCharge: String,
    deliveryAddress: String,
    deliveredBy: String
}, { _id: true,
    timestamps:true
 });

const historyModel = mongoose.models.history 
  || mongoose.model("history", orderHistorySchema, "history");

export default historyModel;