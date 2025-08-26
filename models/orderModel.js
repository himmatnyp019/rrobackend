import mongoose from "mongoose";


// Function to format date
function formatDate(date) {
  const options = { 
    weekday: "long",   // Monday, Tuesday...
    year: "numeric", 
    month: "2-digit", 
    day: "2-digit", 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: false 
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}
const orderSchema = new mongoose.Schema({
     userId:{type:String, required:true},
     items:{type:Array, required:true},
     info:{type:Array,required:true},
     amount:{type:Number, required:true},
     status:{type:String, default:"Order Processing..."},
    time:{type:String, default: () => formatDate(new Date())},
    payment:{type:Boolean, default:false}

},{
    timestamps:true,
})
const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;