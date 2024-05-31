# Bobbit - Promineo Tech Week 16 Final 🎓

![GitHub stars](https://img.shields.io/github/stars/WilkBob/Bobbit?style=social)
![GitHub forks](https://img.shields.io/github/forks/WilkBob/Bobbit?style=social)
![GitHub issues](https://img.shields.io/github/issues/WilkBob/Bobbit)
![GitHub pull requests](https://img.shields.io/github/issues-pr/WilkBob/Bobbit)
![GitHub license](https://img.shields.io/github/license/WilkBob/Bobbit)

Bobbit is a community forum application that emulates some of Reddit's functionality. It allows users to create posts, profiles, and boards, fostering a platform for discussion and interaction. 📝

## Technologies Used 💻

- **React**: The application is built using React, a popular JavaScript library for building user interfaces.
- **Firebase**: Firebase is used for real-time data updates, user authentication, and data storage.
- **Material-UI**: The application uses Material-UI for a clean, modern design.
- **Vite**: The project is built using Vite, a build tool that significantly improves the development experience. It includes plugins for React and SWC for fast refresh.

## Application Structure 🏗️

The application is structured into several key components:

- **Authentication**: The firebaseAuth.js file handles user authentication, including sign up, sign in, and sign out functionality.
- **Database**: The Firebase database is configured in firebase.js and the rules for read and write operations are defined in database.rules.json.
- **Pages**: The application includes several pages such as Home and About, implemented in Home.jsx and About.jsx respectively.
- **Components**: Various reusable components are used throughout the application, such as AddPost, DisplayPosts, and SortButtons.

## Data Structure 📊

The Firebase database stores data for users, forums, posts, and comments. The rules for data access are defined in database.rules.json. Here's a brief overview of the data structure:

- **Users**: Each user has a unique ID, email, username, profile image, bio, and join date.
- **Forums**: Each forum has an owner ID and posts.
- **Posts**: Each post has a user ID, comments, and likes.
- **Comments**: Each comment has a user ID and likes.


## License 📄

This project is licensed under the MIT License.