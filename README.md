# Library Management System - React Frontend


## Project Description

The Library Management System is a web application that simplifies the management of a library's resources, borrowing, and user interactions. It consists of a Django backend, handling the core functionality and APIs, and this React frontend that provides a user-friendly interface to interact with the system.

### Key Features
#### User Roles
Admin: The highest level of authority, responsible for managing librarians and overseeing the entire library system.
User: Registered users who can browse books, request and return books, and manage their profiles.
Librarian: Library staff members who can process user book requests, manage the library inventory, and address user-generated requests.

### Library Functions
Book Listing: Users can access a list of available books and search for books by name.
Book Requests: Registered users can request books, and librarians can process these requests(approve/reject).
Book Issuance: Users can issue up to 3 books at a time, with inventory automatically updated.
Book Returns: Librarians can close book records when returned.
Book Management: Librarians can add, modify, and delete books.
Ticket Management: Librarian can approve/reject the user ticket for the new book request. (approving will add the book in the book list)

### User Management
User Authentication: Users can sign up, log in, and update their profiles.
User Dashboard: Users have access to a dashboard where they can view their issued books, requested books, returned books
Book Tickets: Users can create a new book ticket not available in the inventory.


## Getting Started
To get started with the frontend of the Library Management System, follow these steps:

Clone this repository to your local machine:

`git clone https://github.com/your-library-frontend-repo.git`

Navigate to the project directory:

`cd library-management-frontend`

Install the required dependencies using npm or yarn:

`npm install`

You can run the application in development mode using the following command:

`npm start`
