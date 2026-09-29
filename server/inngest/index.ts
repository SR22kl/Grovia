import { cron, Inngest } from "inngest";
import { prisma } from "../config/prisma.js";
import sendEmail from "../config/nodemailer.js";

const LOW_STOCK_THRESHOLD = 10;

// Create a client to send and receive events
export const inngest = new Inngest({ id: "grovia-delivery" });

// Your Stock Alert to Admin
const checkLowStock = inngest.createFunction(
  {
    id: "check-low-stock",
    name: "Low Stock Alert",
    triggers: [{ event: "inventory/stock.updated" }],
  },
  async ({ event, step }) => {
    const { productId } = event.data;

    const product = await step.run("fetch-product", async () => {
      return await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
    });

    if (
      !product ||
      !product.stock === null ||
      (product.stock as number) >= LOW_STOCK_THRESHOLD
    ) {
      return { skipped: true, stock: product?.stock };
    }

    await step.run("send-low-stock-email", async () => {
      const adminEmails = process.env.ADMIN_EMAILS
        ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
        : [];

      if (adminEmails.length === 0) {
        return { skipped: true, reason: "No admin emails" };
      }

      await sendEmail({
        to: adminEmails.join(","),
        subject: `Low Stock Alert: ${product.name}`,
        body: `
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Low Stock Alert</title>
            </head>

            <body style="
              margin: 0;
              padding: 0;
              background-color: #f4f4f5;
              font-family: Arial, Helvetica, sans-serif;
              color: #18181b;
            ">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background-color: #f4f4f5; padding: 40px 16px;"
              >
                <tr>
                  <td align="center">

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        max-width: 600px;
                        background-color: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                        border: 1px solid #e4e4e7;
                      "
                    >

                      <!-- Header -->
                      <tr>
                        <td style="
                          padding: 28px 32px;
                          background-color: #18181b;
                        ">
                          <div style="
                            font-size: 20px;
                            font-weight: 700;
                            color: #ffffff;
                          ">
                            Inventory Alert
                          </div>

                          <div style="
                            margin-top: 6px;
                            font-size: 13px;
                            color: #a1a1aa;
                          ">
                            Action may be required
                          </div>
                        </td>
                      </tr>

                      <!-- Alert -->
                      <tr>
                        <td style="padding: 32px;">

                          <div style="
                            display: inline-block;
                            padding: 7px 12px;
                            background-color: #fef2f2;
                            color: #dc2626;
                            border-radius: 999px;
                            font-size: 12px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                          ">
                            Low Stock
                          </div>

                          <h1 style="
                            margin: 18px 0 8px;
                            font-size: 26px;
                            line-height: 1.3;
                            color: #18181b;
                          ">
                            ${product.name}
                          </h1>

                          <p style="
                            margin: 0;
                            font-size: 15px;
                            line-height: 1.6;
                            color: #52525b;
                          ">
                            This product has reached a low inventory level and
                            may need to be restocked soon.
                          </p>

                          <!-- Stock Card -->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
                              margin-top: 28px;
                              background-color: #fafafa;
                              border: 1px solid #e4e4e7;
                              border-radius: 12px;
                            "
                          >
                            <tr>
                              <td style="padding: 20px;">

                                <div style="
                                  font-size: 12px;
                                  color: #71717a;
                                  text-transform: uppercase;
                                  letter-spacing: 0.5px;
                                  font-weight: 600;
                                ">
                                  Current Stock
                                </div>

                                <div style="
                                  margin-top: 8px;
                                  font-size: 36px;
                                  line-height: 1;
                                  font-weight: 800;
                                  color: #dc2626;
                                ">
                                  ${product.stock}
                                </div>

                                <div style="
                                  margin-top: 8px;
                                  font-size: 13px;
                                  color: #71717a;
                                ">
                                  units remaining
                                </div>

                              </td>

                              <td
                                width="1"
                                style="background-color: #e4e4e7;"
                              ></td>

                              <td style="padding: 20px;">

                                <div style="
                                  font-size: 12px;
                                  color: #71717a;
                                  text-transform: uppercase;
                                  letter-spacing: 0.5px;
                                  font-weight: 600;
                                ">
                                  Alert Threshold
                                </div>

                                <div style="
                                  margin-top: 8px;
                                  font-size: 36px;
                                  line-height: 1;
                                  font-weight: 800;
                                  color: #18181b;
                                ">
                                  ${LOW_STOCK_THRESHOLD}
                                </div>

                                <div style="
                                  margin-top: 8px;
                                  font-size: 13px;
                                  color: #71717a;
                                ">
                                  units
                                </div>

                              </td>
                            </tr>
                          </table>

                          <!-- Action -->
                          <div style="
                            margin-top: 28px;
                            padding: 16px 18px;
                            background-color: #fff7ed;
                            border: 1px solid #fed7aa;
                            border-radius: 10px;
                          ">
                            <p style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 1.5;
                              color: #9a3412;
                            ">
                              <strong>Recommended action:</strong>
                              Review the inventory and consider restocking this
                              product before it runs out.
                            </p>
                          </div>

                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="
                          padding: 20px 32px;
                          border-top: 1px solid #e4e4e7;
                          background-color: #fafafa;
                        ">
                          <p style="
                            margin: 0;
                            font-size: 12px;
                            line-height: 1.5;
                            color: #71717a;
                          ">
                            This is an automated inventory notification.
                            Please do not reply to this email.
                          </p>
                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    });
    return { alerted: true, product: product.name, stock: product.stock };
  },
);

// Montly Offers Email (1st of every month)
const sendMonthlyOfferEmail = inngest.createFunction(
  {
    id: "send-monthly-offer-email",
    name: "Monthly Payday Offer",
    triggers: [cron("0 10 1 * *")],
  },
  async ({ step }) => {
    const { deals, users } = await step.run(
      "fetch-deals-and-user",
      async () => {
        // Get top discounted deals
        const products = await prisma.product.findMany({
          where: { stock: { gt: 0 } },
          orderBy: { originalPrice: "desc" },
          take: 6,
        });

        const allUsers = await prisma.user.findMany({
          select: { email: true, name: true },
        });
        return { deals: products, users: allUsers };
      },
    );
    if (users.length === 0 || deals.length === 0) {
      return { skipped: true, reason: "No users or deals" };
    }

    let sentCount = 0;

    // send in batches of 10 to avoid overlimiting  mail server
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      await step.run(`send-monthly-offer-email-${i}`, async () => {
        for (const u of batch) {
          await sendEmail({
            to: u.email,
            subject: "🎉 Monthly Payday Offer — Deals You Don't Want to Miss!",
            body: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Monthly Payday Offer</title>
              </head>

              <body style="
                margin: 0;
                padding: 0;
                background-color: #f4f4f5;
                font-family: Arial, Helvetica, sans-serif;
                color: #18181b;
              ">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    background-color: #f4f4f5;
                    padding: 32px 16px;
                  "
                >
                  <tr>
                    <td align="center">

                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          max-width: 640px;
                          background-color: #ffffff;
                          border-radius: 18px;
                          overflow: hidden;
                        "
                      >

                        <!-- HERO -->
                        <tr>
                          <td
                            align="center"
                            style="
                              padding: 42px 30px;
                              background-color: #18181b;
                            "
                          >

                            <div style="
                              font-size: 13px;
                              font-weight: 700;
                              color: #facc15;
                              text-transform: uppercase;
                              letter-spacing: 1.5px;
                            ">
                              Monthly Payday Offer
                            </div>

                            <h1 style="
                              margin: 14px 0 10px;
                              font-size: 36px;
                              line-height: 1.15;
                              color: #ffffff;
                              font-weight: 800;
                            ">
                              Your Payday.<br />
                              Your Deals. 🎉
                            </h1>

                            <p style="
                              margin: 0 auto;
                              max-width: 450px;
                              font-size: 15px;
                              line-height: 1.6;
                              color: #d4d4d8;
                            ">
                              Payday just got better! Check out our handpicked deals
                              and grab your favorites before they're gone.
                            </p>

                          </td>
                        </tr>


                        <!-- INTRO -->
                        <tr>
                          <td style="padding: 32px 30px 18px;">

                            <h2 style="
                              margin: 0 0 8px;
                              font-size: 22px;
                              color: #18181b;
                            ">
                              🔥 Top Deals For You
                            </h2>

                            <p style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 1.6;
                              color: #71717a;
                            ">
                              We've picked some of the deals worth checking out this
                              month.
                            </p>

                          </td>
                        </tr>


                        <!-- PRODUCTS -->
                        <tr>
                          <td style="padding: 10px 30px 25px;">

                            ${deals
                              .map((product) => {
                                const discount = Math.round(
                                  ((Number(product.originalPrice) -
                                    product.price) /
                                    Number(product.originalPrice)) *
                                    100,
                                );

                                return `
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    style="
                                      margin-bottom: 14px;
                                      border: 1px solid #e4e4e7;
                                      border-radius: 12px;
                                      overflow: hidden;
                                    "
                                  >
                                    <tr>

                                      <!-- PRODUCT IMAGE -->
                                      <td
                                        width="130"
                                        valign="top"
                                        style="
                                          padding: 0;
                                          background-color: #f4f4f5;
                                        "
                                      >
                                        <img
                                          src="${product.image}"
                                          alt="${product.name}"
                                          width="130"
                                          style="
                                            display: block;
                                            width: 130px;
                                            height: 130px;
                                            object-fit: cover;
                                          "
                                        />
                                      </td>


                                      <!-- PRODUCT INFO -->
                                      <td
                                        valign="top"
                                        style="padding: 18px;"
                                      >

                                        <div style="
                                          display: inline-block;
                                          padding: 5px 9px;
                                          background-color: #dcfce7;
                                          color: #15803d;
                                          border-radius: 999px;
                                          font-size: 11px;
                                          font-weight: 700;
                                        ">
                                          ${discount}% OFF
                                        </div>

                                        <h3 style="
                                          margin: 10px 0 7px;
                                          font-size: 16px;
                                          line-height: 1.35;
                                          color: #18181b;
                                        ">
                                          ${product.name}
                                        </h3>

                                        <div>

                                          <span style="
                                            font-size: 18px;
                                            font-weight: 800;
                                            color: #18181b;
                                          ">
                                            ₹${product.price.toLocaleString("en-IN")}
                                          </span>

                                          <span style="
                                            margin-left: 7px;
                                            font-size: 13px;
                                            color: #a1a1aa;
                                            text-decoration: line-through;
                                          ">
                                            ₹${Number(product.originalPrice).toLocaleString("en-IN")}
                                          </span>

                                        </div>

                                        <div style="
                                          margin-top: 8px;
                                          font-size: 12px;
                                          color: #71717a;
                                        ">
                                          Limited stock available
                                        </div>

                                      </td>

                                    </tr>
                                  </table>
                                `;
                              })
                              .join("")}

                          </td>
                        </tr>


                        <!-- CTA -->
                        <tr>
                          <td
                            align="center"
                            style="
                              padding: 10px 30px 38px;
                            "
                          >

                            <a
                              href="${process.env.NEXT_PUBLIC_APP_URL}/products"
                              style="
                                display: inline-block;
                                padding: 14px 30px;
                                background-color: #18181b;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 10px;
                                font-size: 14px;
                                font-weight: 700;
                              "
                            >
                              Shop All Deals →
                            </a>

                            <p style="
                              margin: 14px 0 0;
                              font-size: 12px;
                              color: #a1a1aa;
                            ">
                              Don't wait — popular products can sell out quickly.
                            </p>

                          </td>
                        </tr>


                        <!-- FOOTER -->
                        <tr>
                          <td style="
                            padding: 22px 30px;
                            background-color: #fafafa;
                            border-top: 1px solid #e4e4e7;
                          ">

                            <p style="
                              margin: 0;
                              text-align: center;
                              font-size: 12px;
                              line-height: 1.6;
                              color: #71717a;
                            ">
                              You're receiving this email because you have an account
                              with us.
                            </p>

                            <p style="
                              margin: 7px 0 0;
                              text-align: center;
                              font-size: 11px;
                              color: #a1a1aa;
                            ">
                              © ${new Date().getFullYear()} Your Store. All rights reserved.
                            </p>

                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>
                </table>

              </body>
            </html>
          `,
          });
        }
      });
      sentCount += batch.length;
    }

    return { sent: sentCount };
  },
);

// Auto-Assign Rider after 5 min
const autoAssignRider = inngest.createFunction(
  {
    id: "auto-assign-rider",
    name: "Auto Assign Delivery Rider",
    triggers: [{ event: "order/placed" }],
  },
  async ({ event, step }) => {
    const { orderId } = event.data;

    // wait 5 min before assigning rider
    await step.sleep("wait-5-min", "5m");

    const result = await step.run("assign-rider", async () => {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      // Skip if order doesn't exist, already assigned, or cancelled
      if (!order) {
        return { skipped: true, reason: "Order not found" };
      }

      if (order.deliveryPartnerId) {
        return { skipped: true, reason: "Delivery partner already assigned" };
      }

      if (["Cancelled", "Delivered"].includes(order.status as string)) {
        return { skipped: true, reason: `Order already ${order.status}` };
      }

      // Find an active rider who is currently available
      const busyOrders = await prisma.order.findMany({
        where: {
          status: { in: ["Assigned", "Packed", "Out for Delivery"] },
          deliveryPartnerId: { not: null },
        },
        select: { deliveryPartnerId: true },
      });
      const busyRiderIds = busyOrders.map((order) => order.deliveryPartnerId!);

      const availableRider = await prisma.deliveryPartner.findFirst({
        where: {
          isActive: true,
          id: { notIn: busyRiderIds as string[] },
        },
      });

      if (!availableRider) {
        return { skipped: true, reason: "No available riders" };
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const history = (
        Array.isArray(order.statusHistory) ? order.statusHistory : []
      ) as any[];
      history.push({
        status: "Assigned",
        note: `Assigned to ${availableRider.name}`,
        timestamp: new Date(),
      });

      await prisma.order.update({
        where: { id: orderId },
        data: {
          deliveryPartnerId: availableRider.id,
          otp,
          status: "Assigned",
          statusHistory: history,
        },
      });

      return {
        assigned: true,
        riderId: availableRider.id,
        riderName: availableRider.name,
        otp,
      };
    });

    return result;
  },
);

export const functions = [
  checkLowStock,
  sendMonthlyOfferEmail,
  autoAssignRider,
];
