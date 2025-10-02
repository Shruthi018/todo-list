# Todo List Application

A full-stack **Todo List** application with user authentication.  
Frontend built with **HTML, CSS, JavaScript** and backend powered by **Spring Boot** with **JWT authentication**.  


## 🚀 Features
- User registration and login  
- JWT-based authentication & authorization  
- Add, update, delete todo items  
- Responsive UI with HTML,JS and CSS  
- RESTful backend API  


## 🛠️ Tech Stack
**Frontend:** HTML, CSS, JavaScript  
**Backend:** Spring Boot, Java  
**Database:** (configure in `application.properties`, e.g. MySQL/H2)  
**Authentication:** JWT (JSON Web Token)  


## 📂 Project Structure
Todo List/

├── frontend/ # HTML, CSS, JS files for UI

├── springBootDemo/ # Spring Boot backend project

└── .idea/ # IDE configuration files


## ⚡ Getting Started

### Backend (Spring Boot)
1. Navigate to `springBootDemo/`  
2. Configure database in `src/main/resources/application.properties`  
3. Build and run:
        mvn spring-boot:run
4.Backend runs on http://localhost:8081


## 🎨 Frontend
1. Navigate to `frontend/`  
2. Open `index.html` in your browser (or use **Live Server** in VS Code).  
3. Frontend will interact with backend APIs at **http://localhost:8081**  


## 🔑 API Endpoints

### Auth
- `POST /auth/register` → Register new user  
- `POST /auth/login` → Login and get JWT  

### Todos (JWT required)
- `GET /todos` → Fetch all todos  
- `POST /todos` → Create a new todo  
- `PUT /todos/{id}` → Update a todo  
- `DELETE /todos/{id}` → Delete a todo

  ## 🌐 Deployed Frontend
The frontend of this project is deployed and accessible here:  
👉 [Live Demo]([https://your-frontend-link.com](https://shruthi018.github.io/todo-list/Todo%20List/frontend/login.html))

⚠️ Note: The backend (Spring Boot API) must be running locally or deployed separately at `http://localhost:8080` (or your backend host) for full functionality.

