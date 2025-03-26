InstaVibe

A simple Instagram clone built with Node.js, Express.js, MongoDB, and EJS.

Features

User Authentication (Signup/Login)

Post Creation & Display

Stories Feature

Session Management with MongoDB

Image Uploads using Multer.js

Tech Stack

Backend: Node.js, Express.js

Frontend: EJS, HTML, CSS

Database: MongoDB (Mongoose ODM)

Authentication: Passport.js

Session Storage: Connect-Mongo

File Uploads: Multer.js

Installation & Setup

Prerequisites

Node.js installed

MongoDB Atlas or Local MongoDB setup

Steps

Clone the repository:

git clone https://github.com/yourusername/InstaVibe.git
cd InstaVibe

Install dependencies:

npm install

Create a .env file in the root directory and add the following:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xziip0l.mongodb.net/instavibe?retryWrites=true&w=majority
SESSION_SECRET=your_secret_key

Run the app:

node app.js

Open your browser and go to:

http://localhost:3000

Deployment

To deploy on Vercel:

Push your project to GitHub.

Link the repository to Vercel.

Add MONGODB_URI and SESSION_SECRET in Vercel's Environment Variables.

Deploy and enjoy!

License

This project is open-source and available under the MIT License.

