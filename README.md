# Anya Assignment

## Project Overview

"Anya Assignment" is a Node.js application designed to demonstrate CRUD operations on two primary data models: `Author` and `Book`. The project showcases user authentication, RESTful API design, and the generation of mock data for testing. It leverages technologies like Express.js for the server framework and MongoDB for the database.

## Key Features

- **User Authentication**: Secured endpoints using custom `authMiddleware`.
- **CRUD Operations**: Full create, read, update, and delete capabilities for authors and books.
- **Mock Data Generation**: Script to create mock authors and books using faker.js.
- **Data Models**: Two main models (`Author` and `Book`) managed using Mongoose ORM.
- **API Testing**: Postman collection included for easy API testing and interaction.

## File Structure

```
Anya Assignment/
│
├── middleware/
│   └── authMiddleware.js   # Handles user authentication
├── models/
│   ├── Author.js           # Schema for the Author model
│   └── Book.js             # Schema for the Book model
├── routes/
│   ├── authorRoutes.js     # Routes for author-related operations
│   └── bookRoutes.js       # Routes for book-related operations
├── scripts/
│   └── generateMockData.js # Script to generate mock data
├── .env                    # Environment variables (not tracked by Git)
├── .gitignore              # Specifies files to be ignored by Git
├── app.js                  # Main application file
├── package-lock.json       # Lock file for NPM dependencies
├── package.json            # NPM package and script definitions
└── dependencygraph.dot     # Dependency graph (Graphviz format)
```

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/anya-assignment.git
   cd anya-assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., database connection string).

4. **Run the Application**
   ```bash
   npm start
   ```

## Usage

After starting the server, the API endpoints will be available for interaction. Use the included Postman collection (`ANYA_ASSIGN_APIS.postman_collection.json`) to test and interact with the API.

## Mock Data Generation

Run the `generateMockData.js` script to populate your database with mock authors and books:

```bash
node scripts/generateMockData.js
```
