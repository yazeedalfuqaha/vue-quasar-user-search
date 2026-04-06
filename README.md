# 👥 User Search Dashboard

**Vue 3 • TypeScript • Quasar Framework**

A high-performance, type-safe user directory application built with **Vue 3** and the **Quasar Framework**.  
This application leverages the **JSONPlaceholder API** to provide real-time user data fetching with a focus on polished UX and robust error handling.

---

## 🚀 Key Features

- **Intelligent Search:** Instant user profile retrieval via ID-based queries.  
- **Dynamic UI Components:** Fully responsive and interactive user cards.  
- **Skeleton Loading States:** Integrated Quasar skeletons for seamless perceived performance.  
- **Smart Avatars:** Automated placeholder generation based on user initials.  
- **Resilient Architecture:** Handles 404s, network errors, and invalid inputs gracefully.  
- **Type Safety:** End-to-end TypeScript implementation for data integrity.  
- **Modern Aesthetics:** CSS fade-in transitions and Material Design styling with Quasar.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue 3 (Composition API / `<script setup>`) |
| UI Library | Quasar Framework |
| Language | TypeScript |
| Data Fetching | Native Fetch API |
| Styling | Sass / Flexbox (Quasar Grid) |

---

## 📂 Project Structure
src/
├── types/
│ └── users.ts # TypeScript interfaces: User, Address, Company, Geo
├── pages/
│ └── IndexPage.vue # Core logic: State management, API calls, and UI
├── layouts/
│ └── MainLayout.vue # Quasar layout wrapper
└── App.vue # Root component


---

## 📖 API Reference

This application consumes the **JSONPlaceholder REST API**.

- **Endpoint:** `https://jsonplaceholder.typicode.com/users/{id}`  
- **Valid Range:** `1 - 10`  
- **Example Response Schema:**

```ts
export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}
🚦 Getting Started
Prerequisites
Node.js (v16+)
NPM or Yarn
Quasar CLI: npm install -g @quasar/cli
Installation & Development
# Clone repository
git clone https://github.com/yazeedalfuqaha/vue-quasar-user-search.git
cd vue-quasar-user-search

# Install dependencies
npm install

# Start development server
quasar dev
Production Build
quasar build
📌 Usage
Enter a User ID between 1 and 10.
Click Get User Data or press Enter.
View user details with fully interactive Quasar components and skeleton loaders while fetching data.
Errors (404, network issues, invalid input) are handled gracefully with banners.
💡 Contributing

Contributions, bug reports, and feature requests are welcome!
Please fork the repo and submit a pull request.
