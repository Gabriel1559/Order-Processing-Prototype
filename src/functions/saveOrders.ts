import { getConnection } from "../database/dbConnection.js";
import { parseEDIFACT } from "../parse/edifactParse.js";

export class OrderService {
  async saveOrders(): Promise<string> {
    const orders = parseEDIFACT();
    const pool = await getConnection();
    for (const order of orders) {
      // save customer
      await pool.request()
        .input('Id', order.customer.id)
        .input('Name', order.customer.name)
        .input('Address', order.customer.address)
        .query(`
          MERGE Customers AS target
          USING (SELECT @Id AS Id) AS source
          ON target.Id = source.Id
          WHEN NOT MATCHED THEN INSERT (Id, Name, Address) VALUES (@Id, @Name, @Address);
        `);

      // save order
      await pool.request()
        .input('OrderId', order.orderId)
        .input('CustomerId', order.customer.id)
        .input('OrderDate', order.orderDate)
        .query(`
          INSERT INTO Orders (order_id, customer_id, order_date)
          VALUES (@OrderId, @CustomerId, @OrderDate);
        `);

      // save order items
      for (const [index, item] of order.items.entries()) {
        await pool.request()
          .input('OrderId', order.orderId)
          .input('ItemId', index + 1)
          .input('Quantity', item.quantity)
          .input('Price', item.price)
          .query(`
            INSERT INTO Order_Items (order_id, item_id, quantity, price)
            VALUES (@OrderId, @ItemId, @Quantity, @Price);
          `);
      }
    }
    return 'Orders saved successfully';
  }
}
