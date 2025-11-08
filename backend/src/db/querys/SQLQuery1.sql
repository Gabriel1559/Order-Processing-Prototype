-- Customers table
CREATE TABLE Customers (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Items table
CREATE TABLE Items (
    id_item INT PRIMARY KEY,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL
);

-- Orders table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    delivery_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

-- Linking table for many-to-many relationship between Orders and Items
CREATE TABLE Order_Items (
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT DEFAULT 1,
    PRIMARY KEY(order_id, item_id),
    FOREIGN KEY(order_id) REFERENCES Orders(order_id),
    FOREIGN KEY(item_id) REFERENCES Items(id_item)
);