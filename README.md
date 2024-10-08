# Movie Booking System

Welcome to the Movie Booking System, a fullstack application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to browse movies, book tickets, and manage their accounts, all while ensuring secure transactions and data handling.

## Features

### User Flow


1. **Home Page**: 
   - View an overview of the system and navigate to other pages.
   - ![Home Page](/frontend/src/assets/mbs/home.png)

2. **Movies Page**: 
   - Browse all available movies.
   - ![Movies Page](/frontend/src/assets/mbs/movies.png)

3. **Movie Details Page**: 
   - View detailed descriptions of each movie.
   - Watch the trailer of the movie.
   - Select seats and choose a date and time.
   - ![Movie Details Page](/frontend/src/assets/mbs/details.png)

4. **Booking and Payment**: 
   - Select seats for a specific movie.
   - Choose a day and time for the screening.
   - Complete payment using Stripe.
   - ![Booking and Payment](/frontend/src/assets/mbs/details2.png)

5. **Schedule Page**: 
   - View your purchased tickets and any previous bookings.
   - ![Schedule Page](/frontend/src/assets/mbs/schedule.png)

6. **Settings Page**: 
   - Update user data, change password, or delete your account.
   - ![Settings Page](/frontend/src/assets/mbs/settings.png)

7. **Signup Page**:
   - Register a new account by providing necessary details.
   - ![Signup Page](/frontend/src/assets/mbs/singup.png)

8. **Login Page**:
   - Log in to your account using your credentials.
   - ![Login Page](/frontend/src/assets/mbs/login.png)


### Navigation

- **Navbar**:
  - When logged in: Navigate to Home, Settings, Ticket Page, and Logout.
  - ![Navbar](/frontend/src/assets/mbs/navloggedin.png)
  - When not logged in: Navigate to Home, Signup, Login, and View Movies.
  - ![Navbar](/frontend/src/assets/mbs/navnotlogged.png)


### Authentication and Security

- **JWT**: Used for user authentication and authorization.
- **bcrypt**: Used for secure password hashing.
- **Validator**: Ensures input validation and data integrity.

### Installation

To get started with the Movie Booking System, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/movie-booking-system.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd movie-booking-system
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Setup Environment Variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```
5. **Run the application**:
    ```bash
    npm start
    ```

### Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.



### Future Work

The admin frontend is currently under development. It will provide additional functionality for managing movies, schedules, and user accounts.

---

