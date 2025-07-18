# Grocery List Project

This repository contains a full-stack grocery list application with separate frontend and backend components, designed for easy management of grocery items and lists.

## Project Structure

  - `src/app/`: Contains components, models, and services for managing grocery lists and items.
  - `angular.json`, `package.json`: Angular and npm configuration files.

  - `Controllers/`: API endpoints for grocery lists and items.
  - `Models/`, `DTOs/`, `Repositories/`, `Services/`: Business logic and data access layers.
  - `appsettings.json`: API configuration.

## Getting Started

### Prerequisites
Node.js & npm (for frontend development)
Angular (version 19.1.0)
.NET 6/8 SDK (for backend development)
- Docker
- Docker Compose

### Development
- **Frontend**: Navigate to `GroceryList-FRONTEND/` and run:
  ```powershell
  npm install; ng serve
  ```
- **Backend**: Navigate to `GroceryList-RESTAPI/` and run:
  ```powershell
  dotnet run --project GroceryListApi.csproj
  ```

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/oocarrazco/grocery-list.git
   cd GroceryList
   ```

2. Start all services:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - **Frontend**: http://localhost:4200
   - **API**: http://localhost:5003
   - **API Documentation**: http://localhost:5003/swagger
   - **SQL Server**: localhost:1433 (sa/YourStrong!Passw0rd)
   - **Default application credentials**: admin / admin (seeded automatically)

   
## Features
- Login and Reister User
- Create, update, and delete grocery lists and items
- Mark items as purchased
- Responsive UI with Angular
- RESTful API with ASP.NET Core