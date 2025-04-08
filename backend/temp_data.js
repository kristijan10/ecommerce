export const users = [
  {
    id: 0,
    username: "kristijan",
    email: "kristijan@gmail.com",
    password: "123",
    isAdmin: true,
  },
  {
    id: 1,
    username: "filip",
    email: "filip@gmail.com",
    password: "123",
    isAdmin: false,
  },
];

export const products = [
  {
    id: 0,
    name: "Televizor LG",
    desc: "Televizor marke LG je na prodaju",
    price: 24.5,
    imageUrl: "https://picsum.photos/200",
  },
  {
    id: 1,
    name: "Casio 5",
    desc: "Mehanicki sat koji radi bez baterija",
    price: 124.5,
    imageUrl: "https://picsum.photos/200",
  },
];

export const orders = [
  { id: 0, user_id: 0, status: "pending", createdAt: "25.3.2025T11:05:11Z" },
  { id: 1, user_id: 0, status: "paid", createdAt: "25.3.2025T12:10:20Z" },
  { id: 2, user_id: 1, status: "pending", createdAt: "27.3.2025T11:05:11Z" },
];

export const order_items = [
  { order_id: 0, product_id: 1, quantity: 2, amount: 249 },
  { order_id: 1, product_id: 1, quantity: 1, amount: 124.5 },
  { order_id: 2, product_id: 0, quantity: 10, amount: 245 },
];

// kristijan =
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ0MDk2OTk5fQ.MwugcrzuURb1FHO6vv5odMXXZcnd1YH5jubcZpxOzEw
// filip =
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTc0NDA5ODIyN30.n4eBUdCKIbqB_c9CWDbcpfQ5aROeIKNc625NxKem-As
