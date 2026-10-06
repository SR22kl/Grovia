import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";

// Get admin dashboard data
// GET /api/admin/dashboard
export const getAdminDashboardData = async (req: Request, res: Response) => {
  const [
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStock,
    totalPartner,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        NOT: [{ paymentMethod: "card", isPaid: false }],
      },
    }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.product.count({ where: { stock: { equals: 0 } } }),
    prisma.deliveryPartner.count(),
    prisma.order.findMany({
      where: {
        NOT: [{ paymentMethod: "card", isPaid: false }],
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: { select: { name: true, email: true } },
        deliveryPartner: { select: { name: true, phone: true } },
      },
    }),
  ]);

  res.json({
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStock,
    totalPartner,
    recentOrders,
  });
};

// Get delivery partners list
// GET /api/admin/delivery-partners
export const getDeliveryPartners = async (req: Request, res: Response) => {
  const deliveryPartners = await prisma.deliveryPartner.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json({ deliveryPartners });
};

// Create delivery partner profile
// POST /api/admin/delivery-partners
export const createDeliveryPartner = async (req: Request, res: Response) => {
  const { name, phone, email, password, vehicleType } = req.body;

  if (!name || !phone || !email || !password || !vehicleType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const partner = await prisma.deliveryPartner.create({
    data: {
      name,
      phone,
      email: email.toLowerCase(),
      password: hashedPassword,
      vehicleType,
    },
  });
  res.status(201).json({ partner });
};

// update delivery partner profile
// PUT /api/admin/delivery/:id
export const updateDeliveryPartner = async (req: Request, res: Response) => {
  const { name, phone, vehicleType, isActive } = req.body;
  const data: any = {};

  if (name) data.name = name;
  if (phone) data.phone = phone;
  if (vehicleType) data.vehicleType = vehicleType;
  if (isActive !== undefined) data.isActive = isActive;

  try {
    const partner = await prisma.deliveryPartner.update({
      where: { id: String(req.params.id) },
      data,
    });

    if (!partner) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }

    res.json({ partner });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Assign delivery partner to order
// PUT /api/admin/orders/:orderId/assign-partner/:partnerId
export const assignDeliveryPartner = async (req: Request, res: Response) => {
  const { partnerId } = req.body;

  const order = await prisma.order.findUnique({
    where: { id: String(req.params.id) },
  });

  const partner = await prisma.deliveryPartner.findUnique({
    where: { id: String(partnerId) },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (!partner) {
    return res.status(404).json({ message: "Delivery partner not found" });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP

  let status = order?.status;

  const history: any[] = Array.isArray(order?.statusHistory)
    ? order?.statusHistory
    : [];

  if (order?.status === "Placed" || order?.status === "Confirmed") {
    status = "Assigned";
    history.push({
      status: "Assigned",
      note: `Assigned to ${partner?.name}`,
      timestamp: new Date(),
    });
  }

  await prisma.order.update({
    where: { id: String(order!.id) },
    data: {
      deliveryPartnerId: String(partner!.id),
      deliveryOtp: otp,
      status,
      statusHistory: history,
    },
  });

  res.json({ message: "Delivery partner assigned successfully", order });
};
