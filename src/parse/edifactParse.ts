import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function parseEDIFACT(fileName = "mockdata.txt") {
  // Fix __dirname for ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Path to your EDIFACT file
  const filePath = path.resolve(__dirname, "../../src/parse", fileName);

  // Read the file
  const edifactData = fs.readFileSync(filePath, "utf-8");

  // Split into individual messages by "UNH"
  const messages = edifactData.split("UNH").filter(msg => msg.trim() !== "");

  // Helper function to parse one message
  function parseMessage(msg: string) {
    const order: any = { orderId: "", orderDate: "", customer: {}, items: [] };
    const segments = msg.split("'");

    segments.forEach(segment => {
      segment = segment.trim();
      const parts = segment.split("+");
      const tag = parts[0];

      switch (tag) {
        case "BGM":
          order.orderId = parts[2] || parts[1] || "";
          break;

        case "DTM":
          // Example: DTM+137:20251108:102'
          const dateParts = parts[1]?.split(":") || [];
          order.orderDate = dateParts[1] || "";
          break;

        case "NAD":
          // Buyer info (BY)
          if (parts[1] === "BY") {
            order.customer = {
              id: parts[2] || "",
              name: parts[4] || "",
              address: [parts[5], parts[6], parts[7]]
                .filter(Boolean)
                .join(", ")
            };
          }
          break;

        case "LIN":
          order.items.push({
            productName: parts[3]?.split(":")[0] || "",
            quantity: 0,
            price: 0
          });
          break;

        case "QTY":
          if (order.items.length > 0) {
            const lastItem = order.items[order.items.length - 1];
            lastItem.quantity = Number(parts[1]?.split(":")[1] || 0);
          }
          break;

        case "PRI":
          if (order.items.length > 0) {
            const lastItem = order.items[order.items.length - 1];
            lastItem.price = Number(parts[1]?.split(":")[1] || 0);
          }
          break;
      }
    });

    return order;
  }

  // Parse all messages
  const parsedOrders = messages.map(msg => parseMessage(msg));

  // Debug log
  console.log("✅ Parsed Orders:");
  console.log(JSON.stringify(parsedOrders, null, 2));

  // Return parsed data as JSON string
  return parsedOrders;
}
