-- Create the Role_tbl table
CREATE TABLE Role_tbl (
    RoleId INT PRIMARY KEY IDENTITY(1,1),
    UserRole VARCHAR(50) NOT NULL
);

-- Create the Users_tbl table
CREATE TABLE Users_tbl (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Mobile VARCHAR(15) NOT NULL,
    Password VARCHAR(255) NOT NULL,
	RoleId int FOREIGN KEY REFERENCES Role_tbl(RoleId)
);

--Add Values in Role and User table
INSERT INTO Role_tbl (UserRole) VALUES
('Admin'),
('Customer');

INSERT INTO Users_tbl (Name, Email, Mobile, Password, RoleId) VALUES
('Ali Raza', 'ali.raza@gmail.com', '03001234567', 'password123', 1),
('Ayesha Malik', 'ayesha.malik@example.pk', '03019876543', 'password123', 1),
('Ahmed Raza', 'ahmed.raza@example.pk', '03023456789', 'password123', 2),
('Sara Ali', 'sara.ali@example.pk', '03037654321', 'password123', 2),
('Umar Farooq', 'umar.farooq@example.pk', '03049876543', 'password123', 2),
('Fatima Javed', 'fatima.javed@example.pk', '03051234567', 'password123', 2),
('Bilal Hussain', 'bilal.hussain@example.pk', '03062345678', 'password123', 2),
('Hina Shah', 'hina.shah@example.pk', '03073456789', 'password123', 2),
('Zainab Abbas', 'zainab.abbas@example.pk', '03084567890', 'password123', 2),
('Arif Mahmood', 'arif.mahmood@example.pk', '03095678901', 'password123', 2),
('Nida Ahmed', 'nida.ahmed@example.pk', '03101234567', 'password123', 2),
('Kamran Ali', 'kamran.ali@example.pk', '03112345678', 'password123', 2),
('Rabia Noor', 'rabia.noor@example.pk', '03123456789', 'password123', 2),
('Shoaib Hassan', 'shoaib.hassan@example.pk', '03134567890', 'password123', 2),
('Faisal Iqbal', 'faisal.iqbal@example.pk', '03145678901', 'password123', 2),
('Sana Khan', 'sana.khan@example.pk', '03156789012', 'password123', 2),
('Tariq Aziz', 'tariq.aziz@example.pk', '03167890123', 'password123', 2),
('Lubna Aslam', 'lubna.aslam@example.pk', '03178901234', 'password123', 2),
('Asad Mehmood', 'asad.mehmood@example.pk', '03189012345', 'password123', 2),
('Shazia Anwar', 'shazia.anwar@example.pk', '03190123456', 'password123', 2);


-- Create the Category_tbl table
CREATE TABLE Category_tbl (
    CategoryId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName VARCHAR(500) NOT NULL
);

-- Create the Product_tbl table
CREATE TABLE Product_tbl (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Promotion VARCHAR(100),
    Discount DECIMAL(5, 2),
    Review NVARCHAR(MAX),
	CategoryId int FOREIGN KEY REFERENCES Category_tbl(CategoryId)
);


--Add Values in Category and Product table

-- Insert records into Category_tbl
INSERT INTO Category_tbl (CategoryName) VALUES
('Electronics'),
('Laptops'),
('Gaming'),
('Mobile');

-- Insert 50 product records into Product_tbl
INSERT INTO Product_tbl (Name, Price, Promotion, Discount, Review, CategoryId) VALUES
('Smartphone Y', 599.99, 'Free Shipping', 30.00, 'Very good smartphone.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Mobile')),
('Smartphone Z', 799.99, 'Free Case', 50.00, 'Excellent camera quality.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Mobile')),
('Laptop Basic', 499.99, 'Student Discount', 20.00, 'Affordable and efficient.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Laptops')),
('Laptop Advanced', 999.99, '10% off', 100.00, 'Great performance for professionals.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Laptops')),
('Gaming Laptop', 1499.99, 'Free Game', 150.00, 'Ultimate gaming experience.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Wireless Headphones', 199.99, 'Buy one, get one 50% off', 25.00, 'Comfortable and high quality sound.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Bluetooth Speaker', 99.99, 'Free Shipping', 10.00, 'Portable and loud.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('4K Monitor', 399.99, 'Extended Warranty', 50.00, 'Crystal clear display.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Gaming Console X', 499.99, 'Bundle with 2 games', 40.00, 'Fantastic gaming console.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Gaming Console Y', 599.99, 'Free Controller', 50.00, 'Next-gen gaming console.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Tablet A', 299.99, 'Free Case', 30.00, 'Lightweight and fast.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Tablet B', 399.99, '10% off', 40.00, 'High-resolution display.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smartwatch X', 199.99, 'Buy one, get one 50% off', 20.00, 'Tracks all your activities.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smartwatch Y', 249.99, 'Free Shipping', 25.00, 'Stylish and functional.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Home Theater System', 899.99, 'Free Installation', 100.00, 'Cinema-like experience at home.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart TV 55"', 699.99, 'Extended Warranty', 75.00, 'Amazing picture quality.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart TV 65"', 999.99, 'Free Installation', 100.00, 'Immersive viewing experience.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Gaming Chair', 249.99, 'Free Shipping', 20.00, 'Comfortable for long gaming sessions.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Gaming Mouse', 49.99, 'Buy one, get one 50% off', 10.00, 'Precision and control.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Gaming Keyboard', 99.99, '10% off', 15.00, 'RGB lighting and responsive keys.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Desktop PC', 899.99, 'Free Setup', 50.00, 'Powerful and customizable.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Laptops')),
('All-in-One PC', 699.99, 'Extended Warranty', 40.00, 'Compact and efficient.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Laptops')),
('VR Headset', 299.99, 'Free Shipping', 30.00, 'Immersive virtual reality.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Drone', 499.99, '10% off', 50.00, 'Capture stunning aerial footage.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Action Camera', 199.99, 'Free Accessories', 20.00, 'Perfect for adventure seekers.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Digital Camera', 599.99, 'Free Memory Card', 50.00, 'High-quality photos and videos.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Home Hub', 149.99, '10% off', 15.00, 'Control all your smart devices.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Robot Vacuum', 399.99, 'Free Shipping', 40.00, 'Keeps your home clean effortlessly.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Light Bulbs', 49.99, 'Buy one, get one 50% off', 5.00, 'Energy-efficient and colorful.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Doorbell', 199.99, 'Free Installation', 20.00, 'See who is at your door.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Fitness Tracker', 99.99, 'Buy one, get one 50% off', 10.00, 'Monitors your health and activities.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Electric Scooter', 499.99, 'Free Helmet', 50.00, 'Fun and eco-friendly transport.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Electric Bike', 999.99, 'Extended Warranty', 100.00, 'Efficient and fun to ride.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Portable Projector', 299.99, 'Free Tripod', 30.00, 'Great for home and outdoor movies.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Thermostat', 199.99, '10% off', 20.00, 'Saves energy and keeps you comfortable.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Lock', 149.99, 'Free Installation', 15.00, 'Secure and convenient.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Gaming Monitor', 399.99, 'Extended Warranty', 40.00, 'Smooth and responsive display.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Gaming')),
('Noise Cancelling Headphones', 299.99, 'Buy one, get one 50% off', 30.00, 'Blocks out all noise.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Wireless Charger', 49.99, 'Free Shipping', 5.00, 'Convenient and fast charging.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Glasses', 199.99, '10% off', 20.00, 'Augmented reality on the go.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('E-Reader', 129.99, 'Free Case', 15.00, 'Read books anywhere.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Portable Power Bank', 49.99, 'Buy one, get one 50% off', 5.00, 'Keep your devices charged.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Plug', 29.99, 'Free Shipping', 3.00, 'Control your devices remotely.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Electric Toothbrush', 99.99, 'Buy one, get one 50% off', 10.00, 'Keeps your teeth clean and healthy.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Hair Dryer', 49.99, 'Free Shipping', 5.00, 'Quick and efficient drying.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Coffee Maker', 199.99, 'Free Coffee', 20.00, 'Brew perfect coffee at home.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Blender', 99.99, 'Buy one, get one 50% off', 10.00, 'Blend smoothies and more.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Smart Refrigerator', 999.99, 'Free Installation', 100.00, 'Keeps food fresh and organized.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics')),
('Washing Machine', 499.99, 'Extended Warranty', 50.00, 'Efficient and quiet.', (SELECT CategoryId FROM Category_tbl WHERE CategoryName = 'Electronics'));

-- Create the Order_tbl table
CREATE TABLE Order_tbl (
    OrderId INT PRIMARY KEY IDENTITY(1,1),
    OrderNumber VARCHAR(50) NOT NULL,
    OrderDate DATE NOT NULL,
	UserId int FOREIGN KEY REFERENCES Users_tbl(UserId),
    ProductId int FOREIGN KEY  REFERENCES Product_tbl(ProductId),
    Quantity INT NOT NULL,
    Total DECIMAL(10, 2) NOT NULL
);

-- Insert 10 orders into Order_tbl
INSERT INTO Order_tbl (OrderNumber, OrderDate, UserId, ProductId, Quantity, Total) VALUES
('ORD001', '2024-05-24', 1, 1, 2, 1199.98),
('ORD002', '2024-05-24', 2, 2, 1, 999.99),
('ORD003', '2024-12-24', 3, 3, 3, 449.97),
('ORD004', '2024-12-24', 4, 4, 1, 399.99),
('ORD005', '2024-03-24', 5, 5, 2, 2999.98),
('ORD006', '2024-03-24', 6, 6, 1, 199.99),
('ORD007', '2024-03-24', 7, 7, 4, 399.96),
('ORD008', '2024-03-24', 8, 8, 1, 899.99),
('ORD009', '2024-04-24', 9, 9, 2, 1199.98),
('ORD010', '2024-04-24', 10, 10, 1, 599.99);


