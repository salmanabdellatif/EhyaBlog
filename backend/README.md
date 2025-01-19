# EhyaBlog Website Backend

This is the backend for the blog website project, providing the API and database integration for handling articles, user authentication, and profile management.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) for Authentication
- Bcrypt for password hashing
- Multer for handling image uploads

## Installation

Follow the steps below to set up the backend on your local machine.

### 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/salmanabdellatif/EhyaBlog.git
cd EhyaBlog/backend
```

### Install dependencies

`npm install`
# or
`yarn install`


### Set Up Environment Variables
Create a .env file in the root of the project with the following variables:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
SENDGRID_API_KEY=your-sendgrid-api-key (if using for email)

### Database Setup
Make sure you have MongoDB running either locally or using a cloud provider like MongoDB Atlas. The backend will connect to the database using the URI you provide in the .env file.


### Running the Server
Start the backend server with the following command:
`npm start`

The server will be running on http://localhost:5000