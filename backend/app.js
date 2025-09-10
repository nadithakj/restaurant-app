const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const qrcode = require('qrcode');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Add menu item
app.post('/api/menu', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  const menuItem = await prisma.menuItem.create({ data: { name, price, description, imageUrl } });
  res.json(menuItem);
});

// Get menu
app.get('/api/menu', async (req, res) => {
  const menu = await prisma.menuItem.findMany();
  res.json(menu);
});

// Add table and generate QR code
app.post('/api/tables', async (req, res) => {
  const { number } = req.body;
  const dinerUrl = `${process.env.DINER_BASE_URL}/?table=${number}`;
  const qrCodeUrl = await qrcode.toDataURL(dinerUrl);
  const table = await prisma.table.create({
    data: { number, qrCodeUrl }
  });
  res.json(table);
});

// Get all tables
app.get('/api/tables', async (req, res) => {
  const tables = await prisma.table.findMany();
  res.json(tables);
});

// Create order
app.post('/api/orders', async (req, res) => {
  const { tableId, items } = req.body;
  let total = 0;
  for (const item of items) {
    const menuItem = await prisma.menuItem.findUnique({ where: { id: item.menuItemId } });
    total += menuItem.price * item.quantity;
  }
  const order = await prisma.order.create({
    data: {
      tableId,
      total,
      items: { create: items },
      status: 'PENDING'
    },
    include: { items: true }
  });
  res.json(order);
});

// Get orders for kitchen
app.get('/api/orders', async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { status: { not: 'COMPLETED' } },
    include: { items: { include: { menuItem: true } }, table: true }
  });
  res.json(orders);
});

// Mark order as completed
app.post('/api/orders/:id/complete', async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status: 'COMPLETED' }
  });
  res.json(order);
});

// Previous orders
app.get('/api/orders/completed', async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { status: 'COMPLETED' },
    include: { items: { include: { menuItem: true } }, table: true }
  });
  res.json(orders);
});

module.exports = app;
