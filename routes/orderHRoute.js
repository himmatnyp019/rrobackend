import { addOrderHistory, getOrderHistory } from "../controllers/orderHController.js";
import authMiddleware from "../middleware/auth.js";
import express from "express";

const historyRoute = express.Router();

// Adds a new order history entry to the authenticated user
historyRoute.post("/add", authMiddleware, addOrderHistory);
historyRoute.get("/get", authMiddleware, getOrderHistory);
export default historyRoute;
