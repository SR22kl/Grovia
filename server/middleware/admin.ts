import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";

const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((email) =>
          email.trim().toLowerCase(),
        )
      : [];

    if (!adminEmails.includes(user.email.toLowerCase())) {
      return res.status(403).json({ message: "Admin access required" });
    }

    if (req.user) {
      req.user.isAdmin = true;
    }

    return next();
  } catch (error: unknown) {
    console.error("Admin verification failed:", error);

    return res.status(500).json({
      message: "Admin verification failed",
    });
  }
};

export default admin;
