# 🛍️ Cartastrophe – Oops, I Bought It Again

Cartastrophe is a modern e-commerce demo app built with **Next.js, React, TypeScript, and Tailwind CSS**.  
It allows users to browse products, add them to a cart, and go through a full checkout flow.

---

The app is deployed here: [Cartastrophe on Netlify](https://cartastrophe.netlify.app/)  

---

## ✨ Features  

- Checkout form with full validation (email, name, address, postal code, etc.).  
- Option to save customer info for next time (via localStorage).  
- Order summary with items, quantity controls, remove button, and live totals.  
- Shipping logic (free over $100, otherwise $10 flat).  
- Place order flow: validates form, shows loading, clears cart, and displays confirmation screen with random order ID.  
- Skeleton/loading states for cart updates.  
- Responsive design: sticky order summary on desktop, full-width button on mobile.  

---

## 🛠️ Tech Stack  

- **Framework:** Next.js 15 (React + TypeScript, App Router)  
- **Styling:** Tailwind CSS  
- **State Management:** React Context (`cartContext.tsx`)  
- **Data:** Noroff Online Shop API  
- **Deployment:** Netlify  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Andlie94/Cartastrophe-JSFW.git
cd Cartastrophe-JSFW
```

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```
The app should now be running at http://localhost:3000.

### 📦 Build for production

```bash
npm run build
npm start
```

---

## 🔮 Future Improvements
- Implement promo codes and discounts.  
- Persist cart across sessions using localStorage or Supabase.  
- User accounts and login flow.  
- Unit tests for cart reducers, price math, and snapshot states.  
- Polish UI animations and transitions.  

---

## 📄 License
This project was created as part of the Noroff FED2 JavaScript Frameworks course.  
It’s for educational purposes and not intended for production use.
