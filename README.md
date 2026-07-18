# Invoice Maker

A full-stack invoice management application built with **React**, **TypeScript**, **Node.js**, **Express**, and **PostgreSQL**.

Designed for freelancers, contractors, and small businesses to quickly create, manage, and export professional invoices.

---
## Dashboard
![Dashboard](./screenshots/Screenshot%202026-07-18%20150050.png)

## PDF 
![pdf](./screenshots/Screenshot%202026-07-18%20150539.png)

[Invoice maker backend](https://github.com/titchSiobhan/tracker-backend)
## Features

### Invoice Management

- Create invoices with custom issue and due dates
- Add tasks with quantity, unit price, and category
- Automatically format invoice dates
- View all invoices or retrieve individual invoices
- Export invoices as PDF
- Upload and display a company logo

### Company Profile

- Store company information
- Upload a company logo
- Automatically include company details on invoices

### Authentication

- Secure user authentication
- User-specific invoice management

---

## Invoice Layout

Each generated invoice includes:

- Company logo
- Invoice number
- Company information
- Customer details
- Itemised task list
- Quantity, unit price, and totals
- Grand total
- Clean A4/letter-style printable layout

---

## Tech Stack

### Frontend

- React
- TypeScript
- html2pdf.js

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Multer

---

## Installation

### Clone the repository

```bash
git clone <https://github.com/titchSiobhan/tracker-frontend>
cd tracker-frontend
```

### Frontend

```bash
cd ../frontend
npm install
npm run dev

```

---



## License

This project is provided for portfolio and demonstration purposes only.

All rights are reserved. You may not copy, modify, distribute, or use this code without prior written permission.