# GitHub Friend Finder

GitHub Friend Finder is a web application that allows users to search for GitHub profiles, view their repositories, followers, and more. The app enables easy interaction with GitHub's public data to explore users and their information.

## Features

- **User Search**: Search GitHub users by their username.
- **User Profiles**: View detailed GitHub user profiles including repositories, followers, and following counts.
- **Repositories**: Browse through public repositories of users.
- **Followers & Following**: View the list of followers and following for each user.
- **Pagination**: Navigate through multiple pages of users.
- **Error Handling**: Implemented error handling on both front-end and back-end sides.
- **Soft Delete**: Implemented the option for a soft delete for user-related actions.

## Technologies Used

- **Frontend**:
  - React
  - Redux Toolkit
  - Tailwind CSS
  - Axios for API requests
  - React Router DOM

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose for database management
  - GitHub API for fetching user data

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/github-friend-finder.git
   cd github-friend-finder
cd client
npm install

cd server
npm install

Env files 
GITHUB_API_TOKEN=your_github_token
DATABASE_URL=your_mongodb_connection_uri
PORT=
FRONTEND_URL=



