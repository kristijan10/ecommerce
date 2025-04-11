const users = [
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

const products = [
  {
    id: 1,
    name: "Televizor LG",
    description: "Televizor marke LG je na prodaju",
    price: 24.5,
    imageUrl: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Casio 5",
    description: "Mehanicki sat koji radi bez baterija",
    price: 124.5,
    imageUrl: "https://picsum.photos/200",
  },
];

const orders = [
  { user_id: 1, status: "pending" },
  { user_id: 1, status: "paid" },
  { user_id: 2, status: "pending" },
];

const order_items = [
  { order_id: 1, product_id: 2, quantity: 2, amount: 249 },
  { order_id: 2, product_id: 2, quantity: 1, amount: 124.5 },
  { order_id: 3, product_id: 1, quantity: 10, amount: 245 },
];

// kristijan =
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ0MDk2OTk5fQ.MwugcrzuURb1FHO6vv5odMXXZcnd1YH5jubcZpxOzEw
// filip =
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTc0NDA5ODIyN30.n4eBUdCKIbqB_c9CWDbcpfQ5aROeIKNc625NxKem-As
