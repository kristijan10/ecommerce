CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BIT DEFAULT 0 NOT NULL
)

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  desc TEXT,
  price DECIMAL(10,2) NOT NULL,
  imageUrl VARCHAR(100)
)

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  status VARCHAR(10) CHECK(status = 'paid' OR status = 'pending') DEFAULT 'pending' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE order_items(
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  PRIMARY KEY(order_id, product_id),
  quantity DECIMAL(10,2) NOT NULL,
  amount DECIMAL(10,2) NOT NULL
)