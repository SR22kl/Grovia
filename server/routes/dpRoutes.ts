import express from "express";
import {
  cancelDelivery,
  completeDelivery,
  getDeliveryDetails,
  getMyDeliveries,
  loginDeliveryPartner,
  updateDeliveryLocation,
  updateDeliveryStatus,
} from "../controllers/deliveryPartnerController.js";
import deliveryAuth from "../middleware/deliveryAuth.js";

const dpRouter = express.Router();

dpRouter.post("/login", loginDeliveryPartner);
dpRouter.get("/my-deliveries", deliveryAuth, getMyDeliveries);
dpRouter.get("/my-deliveries/:id", deliveryAuth, getDeliveryDetails);
dpRouter.put("/my-deliveries/:id/status", deliveryAuth, updateDeliveryStatus);
dpRouter.put("/my-deliveries/:id/complete", deliveryAuth, completeDelivery);
dpRouter.put("/my-deliveries/:id/cancel", deliveryAuth, cancelDelivery);
dpRouter.put("/my-deliveries/:id/location", deliveryAuth, updateDeliveryLocation);

export default dpRouter;
