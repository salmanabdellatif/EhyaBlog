# **EhyaBlog Website**

**EhyaBlog** is a full-stack blog website project built with React for the frontend and Node.js/Express for the backend. This project provides a platform for users to read and share articles, register, log in, and manage their profiles. The backend handles user authentication, profile management, and article CRUD operations.


## Figma Design

You can view the Figma design of the application here:

[Figma Link](https://www.figma.com/design/omEnaqbUfdKtQH2WmKqJ4z/blog-design?node-id=0-1&p=f&t=wUyAu85LbGzamEHl-0)


## Live Demo

You can view the live demo of the application here:

[Ehya Blog](https://ehya-blog-client.vercel.app/)


## **Project Structure**

The project consists of two main parts:

*   **Frontend**: Built with **React** and styled using **Tailwind CSS**.
*   **Backend**: Built with **Node.js** and **Express.js**, with MongoDB for data storage.

---

## **Frontend Setup**

The frontend is located in the `frontend` folder and provides the user interface for the blog.

### **Technologies Used**:

* React.js
* React Router DOM
* Tailwind CSS
* React Query
* Redux (for state management)

### **Installation**

1. Clone the repository:

```bash
git clone [https://github.com/salmanabdellatif/EhyaBlog.git](https://github.com/salmanabdellatif/EhyaBlog.git)
cd EhyaBlog/frontend
```

2. Install the required dependencies:
npm install
- or
yarn install


3. Run the frontend server:
npm start

The frontend will be running on http://localhost:3000


## **Backend Setup**

The backend is located in the backend folder, providing the API for authentication, user profile management, and article handling.

### **Technologies Used**:
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT (JSON Web Token) for Authentication**
- **Bcrypt for password hashing**
- **Multer for handling image uploads**

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/salmanabdellatif/EhyaBlog.git
cd EhyaBlog/backend
```

2. Install the required dependencies:
npm install
- or
yarn install


3. Set up the environment variables by creating a .env file in the backend folder:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
SENDGRID_API_KEY=your-sendgrid-api-key (if using for email)


4. Run the backend server:
npm start

The backend will be running on http://localhost:5000


## Features

### Frontend:

*   User Registration and Login
*   Article Display with CRUD operations
*   User Profile Management
*   Responsive UI built with Tailwind CSS

### Backend:

*   User Authentication using JWT
*   Article Management (Create, Read, Update, Delete)
*   Profile Management
*   Image upload for user avatars and articles


## Running Both Frontend and Backend

To run both the frontend and backend on your local machine:

1.  Open two terminal windows or tabs.
2.  In the first terminal, navigate to the `backend` folder and run:

    ```bash
    npm start
    ```

3.  In the second terminal, navigate to the `frontend` folder and run:

    ```bash
    npm start
    ```

Both servers will run locally, with the frontend accessible at http://localhost:3000 and the backend at http://localhost:5000.