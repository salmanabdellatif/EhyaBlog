# EhyaBlog Website (Frontend)

A modern blog website frontend built using React, Redux, React Router, Tailwind CSS, and React Query. This application allows users to view articles, read details, post comments, register, login, and manage their profiles.

## Features

- **Home Page**: Displays a list of articles with titles, images, and short descriptions.
- **Article Page**: Users can view the full article and post comments.
- **Authentication**: Users can register, login, and logout.
- **Profile Page**: Users can view and update their profile information, including their profile picture.
- **Responsive Design**: Fully responsive UI built using Tailwind CSS.
- **Social Media Sharing**: Users can share articles on social media platforms.

## Technologies Used

- **Frontend**:
  - React
  - Redux (for state management)
  - React Router (for navigation)
  - Tailwind CSS (for styling)
  - React Query (for data fetching)
  - React Hot Toast (for notifications)

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Clone the repository

```bash
git clone https://github.com/salmanabdellatif/EhyaBlog.git
cd EhyaBlog/frontend
```
### Install dependencies

npm install
# or
yarn install

### Run the project

To start the project locally:
npm start
# or
yarn start

### Folder Structure

blog-website-frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # Favicon
│   └── manifest.json       # Web app manifest for mobile/desktop
├── src/
│   ├── assets/             # Static files like images, fonts, etc.
│   ├── components/         # Reusable components (Buttons, Modals, etc.)
│   ├── pages/              # Pages like Home, Article, Profile, etc.
│   ├── store/              # Redux store and actions
│   ├── services/           # API functions
│   ├── constants/          # Constants (URLs, etc.)
│   ├── App.js              # Main app component
│   └── index.js            # Entry point for React
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration for Tailwind
├── .gitignore              # Git ignore file
└── README.md               # This README file


### Pages

1. - **Home Page**
Displays a list of articles with their titles, images, and a brief preview.
Includes a Hero section and a Call-to-Action (CTA) to encourage user engagement.
2. - **Article Page**
Displays the full content of an article.
Users can read and post comments on the article.
Option to share the article on social media.
3. Login and Register Pages
Users can create accounts or log in to access additional features like commenting and profile management.
4. Profile Page
Users can update their personal information and change their profile picture.
Contributing
We welcome contributions! If you'd like to improve the project, follow these steps:

Fork the repository
Clone your forked repository
Create a new branch (git checkout -b feature-name)
Make your changes
Commit your changes (git commit -m 'Add new feature')
Push to your branch (git push origin feature-name)
Create a pull request