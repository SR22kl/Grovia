import type { DeliveryPartner } from "../../generated/prisma/client.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      isAdmin: boolean;
    };

    partner?: DeliveryPartner;
  }
}

export {};
