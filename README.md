## Overview

This project is an Angular 18 application designed to manage and display user information fetched from an external API. It features a user-friendly interface with a paginated list of users and individual user detail views. 

## Features

- **Created Angular 18 project using Angular CLI**
- **Page Layout**
  - Header for navigation and branding
  - Horizontally centered, paginated users list for easy viewing
- **API Integration**
  - Fetch users from the API: [https://reqres.in/api/users?page={page}](https://reqres.in/api/users?page={page}) for pagination
  - Fetch details for a single user via [https://reqres.in/api/users/{id}](https://reqres.in/api/users/{id})
- **Navigation and Search**
  - Users can be searched based on first name, last name, or user ID.
- **Caching Implementation**
  - Utilizes caching to enhance performance and reduce API calls.
  
## State Management

- **NgRx**
  - Employs NgRx for state management, allowing for predictable state transitions and easier debugging.
- **RxJS Observables**
  - Utilizes observables from RxJS to manage asynchronous operations, ensuring a reactive and responsive application.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Baraa-Nayyal/Angular-User-Api

2. **Install dependencies:**

   ```bash
   npm install

3. **Start the project:**

   ```bash
   ng serve
