const express = require("express")
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send({
    info: "E-Commerce API is active",
    availableRoutes: [
      { method: "GET", path: "/products", description: "View all products" },
      { method: "GET", path: "/orders", description: "View all orders" },
      { method: "POST", path: "/orders", description: "Create a new order" },
      { method: "GET", path: "/orders/:id", description: "Track a specific order" },
      { method: "PUT", path: "/orders/:id", description: "Update order status" }
    ]
  })
})

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 }
]

let orders = []
let orderId = 1

app.get("/products", (req, res) => {
  res.json(products)
})

app.post("/orders", (req, res) => {
  const { customerName, items } = req.body
  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid order details" })
  }
  const order = { id: orderId++, customerName, items, status: "Pending" }
  orders.push(order)
  res.json({ message: "Order created successfully", order })
})

app.get("/orders", (req, res) => {
  res.json(orders)
})

app.put("/orders/:id", (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id))
  if (!order) return res.status(404).json({ message: "Order not found" })
  order.status = req.body.status || order.status
  res.json({ message: "Order status updated", order })
})

app.get("/orders/:id", (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id))
  if (!order) return res.status(404).json({ message: "Order not found" })
  res.json(order)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
