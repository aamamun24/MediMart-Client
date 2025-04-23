# 💊 Next.js Medicine Shop - Frontend

A modern, responsive frontend for an online medicine shop built with Next.js, Redux Toolkit, RTK Query, Tailwind CSS, and Mongoose (for backend integration). This project focuses on providing a seamless shopping experience for customers looking to buy medicines online.

## 📋 Features & Route Structure
### 🏠 Home Page (/)
- Navbar with logo and essential menu items.
- Branding section introducing the shop.
- Search bar to find medicines by name or category.
- Overview section showcasing featured medicines.
- Latest 6 customer reviews.
- Footer with helpful links.

## 📝 Register Page (/register)
- Customers can create an account by providing their details.

## 🔑 Login Page (/login)
- Customers can log in using email and password.

🛒 Shop Page (/shop)
- Displays all available medicines.
- Filtering and sorting options
  - By category
  - By price
  - By prescription requirement
- Infinite scrolling for smooth browsing.

## 📄 Medicine Details (/medicine/:id)
- Shows complete details about a selected medicine.
- Add to cart functionality.

## 🛍️ Cart Page (/cart)
- View selected items.
- Edit quantities or remove items.
- Proceed to checkout.

## 🧾 Checkout Page (/checkout)
- Enter shipping details.
- Upload prescription if required.
- Choose payment method and confirm order.

## 📦 Order History (/orders)
- View past orders.
- Track current orders.

## 👤 Profile Page (/profile)
- Update personal details:
  - Name
  - Email
  - Phone number
  - Address

## 🛠️ Technologies Used
- Next.js
- Redux Toolkit
- RTK Query
- Tailwind CSS
- Mongoose (for backend communication)

## 📌 Getting Started
**1. Clone the repository**
git clone https://github.com/your-username/medicine-shop-frontend.git
cd medicine-shop-frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
