Vue 3 + Quasar User Search App

This is a User Search application built with Vue 3, TypeScript, and Quasar Framework.
It fetches user data from a public API and displays the profile details in a clean, responsive card layout.

Features
🔍 Search Users by ID – Input a user ID to fetch profile data.
📄 Profile Details Display – Shows name, email, address, phone, website, and company info.
🖼 Avatar Placeholder – Displays the first letter of the user's name.
⏳ Skeleton Loading – Provides a smooth skeleton UI while waiting for the API response.
❌ Error Handling – Shows user-friendly messages for invalid input, API errors, or network issues.
🎨 Responsive & Animated UI – Fade-in animation for content, fully responsive card layout.
⚡ TypeScript Safe – All data types are strictly typed using interfaces.
Tech Stack
Vue 3 + <script setup> syntax
Quasar Framework (UI components, skeleton, cards, banners, icons)
TypeScript
Fetch API for network requests
Demo

Enter a number between 1 and 10 (as the API supports https://jsonplaceholder.typicode.com/users/{id}) to fetch a user profile.
Example IDs: 1, 2, 3…

Project Structure
src/pages/IndexPage.vue – Main user search page with UI and logic
src/types/users.ts – TypeScript interfaces for User and Address
src/App.vue – Main app wrapper (Quasar layout)
Usage
Clone the repository:
git clone https://github.com/yourusername/vue-quasar-user-search.git
Install dependencies:
cd vue-quasar-user-search
npm install
Run the development server:
quasar dev
Open your browser at http://localhost:8080 (or the port shown in terminal).