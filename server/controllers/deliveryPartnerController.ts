import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id, role: "delivery" }, process.env.JWT_SECRET! as string, {
    expiresIn: "30d",
  });
};

// Login Delivery Partner
// POST /api/delivery/login
export const loginDeliveryPartner = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const partner = await prisma.deliveryPartner.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!partner) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!partner.isActive) {
    return res.status(401).json({ message: "Your account is inactive" });
  }

  const isMatch = await bcrypt.compare(password, partner.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken(partner.id);
  const { password: _, ...partnerData } = partner;

  res.json({ partner: partnerData, token });
};

// GET assigned deliveries
// GET /api/delivery/my-deliveries
export const getMyDeliveries = async (req: Request, res: Response) => {
  const { status } = req.query;

  const where: any = {
    deliveryPartnerId: req.user!.id,
  };

  if (status === "active") {
    where.status = { in: ["Assigned", "Packed", "Out for Delivery"] };
  } else if (status === "completed") {
    where.status = { in: ["Delivered", "Cancelled"] };
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      user: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ orders });
};

// Get single delivery details
// GET /api/delivery/my-deliveries/:id
export const getDeliveryDetails = async (req: Request, res: Response) => {
  const order = await prisma.order.findFirst({
    where: { id: String(req.params.id), deliveryPartnerId: req.partner!.id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
    },
  });
  if (!order) {
    return res.status(404).json({ message: "Delivery not found" });
  }
  res.json({ order });
};

// Complete delivery with OTP verification
// PUT /api/delivery/my-deliveries/id:/complete
export const completeDelivery = async (req: Request, res: Response) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  const order = await prisma.order.findFirst({
    where: { id: String(req.params.id), deliveryPartnerId: req.partner!.id },
  });

  if (!order || order.status === "Delivered" || order.status === "Cancelled") {
    return res.status(400).json({ message: "Invalid Request" });
  }

  if (order.deliveryOtp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const history = order.statusHistory as any[];
  history.push({
    status: "Delivered",
    note: "Delivered by delivery partner",
    timestamp: new Date(),
  });

  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { status: "Delivered", statusHistory: history, deliveryOtp: "" },
  });

  res.json({ order: updatedOrder, message: "Delivery completed successfully" });
};

// Cancel delivery
// PUT /api/delivery/my-deliveries/id:/cancel
export const cancelDelivery = async (req: Request, res: Response) => {
  const { reason } = req.body;
  const order = await prisma.order.findFirst({
    where: { id: String(req.params.id), deliveryPartnerId: req.partner!.id },
  });

  if (order!.status === "Delivered") {
    return res.status(400).json({ message: "Cannot cancel a delivered order" });
  }

  const history = order!.statusHistory as any[];
  history.push({
    status: "Cancelled",
    note: reason || "Cancelled by delivery partner",
    timestamp: new Date(),
  });

  const updatedOrder = await prisma.order.update({
    where: { id: order!.id },
    data: { status: "Cancelled", statusHistory: history },
  });

  res.json({ order: updatedOrder, message: "Delivery cancelled successfully" });
};

// Update order status
// PUT /api/delivery/my-deliveries/:id/status
export const updateDeliveryStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const allowedStatuses = ["Packed", "Out for Delivery"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status update" });
  }
  const order = await prisma.order.findFirst({
    where: { id: String(req.params.id), deliveryPartnerId: req.partner!.id },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const history = order.statusHistory as any[];
  history.push({
    status,
    note: `Order ${status.toLowerCase()}`,
    timestamp: new Date(),
  });

  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { status, statusHistory: history },
  });

  res.json({ order: updatedOrder, message: "Status updated successfully" });
};

// Update live location of delivery partner
// PUT /api/delivery/my-deliveries/:id/location
export const updateDeliveryLocation = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;

  const order = await prisma.order.findFirst({
    where: {
      id: String(req.params.id),
      deliveryPartnerId: req.partner!.id,
      status: { in: ["Out for Delivery", "Packed", "Assigned"] },
    },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  await prisma.order.update({
    where: { id: order!.id },
    data: { deliveryLocation: { lat, lng, updatedAt: new Date() } },
  });

  res.json({ message: "Location updated successfully", success: true });
};
