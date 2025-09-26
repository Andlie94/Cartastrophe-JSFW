# 🛒 Cartastrophe – Oops, I Bought It Again

Cartastrophe is a modern e-commerce front-end built with **Next.js 15, React, and TypeScript**.  
It was created as part of the JavaScript Frameworks course at Noroff, and the goal was to design and implement a **fully functional checkout experience** using real product data from the Noroff API.  

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

## 👩‍💻 Contributors  

This project was a group effort, where everyone contributed to building different parts:  

- **Anniken**  
  - Checkout page structure and layout.  
  - Form validation (email, name, address, postal code).  
  - LocalStorage persistence for form data.  
  - Order summary with quantity controls, line totals, and responsive tweaks.  
  - Shipping logic (free vs flat rate).  
  - Place order flow with success screen.   

- **Tonje**
   

- **André**
    

Together, we iterated on GitHub issues to ensure each part of the project met the requirements.  

---

## 🚀 Getting Started  

Clone the repository:  
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
