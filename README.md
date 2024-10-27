
# Smart Agenda System

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Overview
The **Smart Agenda System** is a full-featured agenda and calendar automation application. This web-based application is built with React and integrates with Google Calendar for comprehensive scheduling and automation capabilities. It offers features like event scheduling, calendar views, a meal planner, and automated event creation, all authenticated via Auth0.

## Features
- **Google Calendar Integration**: View and manage calendar events in real-time, including event creation and deletion.
- **Event Automation**: Add events to Google Calendar directly from the app with a "Save Event" button in the event creation pop-up.
- **Auth0 Authentication**: User authentication via Auth0 for secure sign-in.
- **Meal Planner**: Schedule meals for each day, integrated into the calendar view for easy access.
- **Responsive UI**: Designed with Tailwind CSS, ensuring a responsive and intuitive interface.

## Project Structure
```
Smart-Agenda-System
├── public                # Public assets and HTML template
├── src                   # Source code for React components
│   ├── components        # Reusable components (calendar, meal planner)
│   ├── pages             # Pages for primary features
│   └── App.js            # Main app component with routing logic
├── server                # Server-related configurations (if applicable)
├── tailwind.config.js    # Tailwind CSS configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Prerequisites
Before running this project, ensure the following are installed:
- **Node.js** and **npm** for managing packages and running the development server.
- An **Auth0 account** for authentication setup.
- A **Google Developer Account** to enable the Calendar API.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/Smart-Agenda-System.git
   cd Smart-Agenda-System
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   In the root directory, create a `.env` file to store sensitive credentials and keys.

## Configuration

### Auth0 Setup
1. Go to your Auth0 dashboard and create a new application.
2. Set up the application as a **Single Page Application (SPA)**.
3. Copy the **Client ID** and **Domain** from Auth0.
4. In the `.env` file, add:
   ```plaintext
   REACT_APP_AUTH0_CLIENT_ID=<YOUR_CLIENT_ID>
   REACT_APP_AUTH0_DOMAIN=<YOUR_DOMAIN>
   ```

5. Set Allowed Callback URLs, Logout URLs, and Web Origins in Auth0 to:
   ```
   http://localhost:3000
   ```

### Google Calendar API Setup
1. Go to the [Google Developers Console](https://console.developers.google.com/) and create a new project.
2. Enable the **Calendar API** for this project.
3. Under **APIs & Services > Credentials**, create an OAuth 2.0 Client ID.
4. Set up an authorized redirect URI for `http://localhost:3000`.
5. Add your **Client ID** to the `.env` file:
   ```plaintext
   REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
   ```

### Running the App
Once the `.env` file is configured, start the development server with:
   ```bash
   npm start
   ```
Your app should now be running at `http://localhost:3000`.

## Available Scripts
In the project directory, you can run:

- **`npm start`**: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- **`npm run build`**: Builds the app for production to the `build` folder. It optimizes the build for the best performance.
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run eject`**: If you need to customize configurations that aren’t supported by the default `create-react-app` setup.

## Technologies Used
- **React** – Frontend framework for building the UI.
- **Auth0** – Authentication solution for secure login.
- **Google Calendar API** – Integrates Google Calendar features.
- **Tailwind CSS** – Provides a modern, responsive design.
- **Axios** – Simplifies HTTP requests for API integration.
- **React Big Calendar** – Calendar visualization component for seamless user experience.

## Usage
1. **Sign in**: Users sign in via Auth0 to access their personalized agenda and Google Calendar.
2. **View and manage calendar**: Once logged in, users can view their Google Calendar events.
3. **Create and save events**: Click "Create Event" to add new events to Google Calendar. Use the "Save Event" button to confirm.
4. **Meal Planner**: Plan meals and keep track of your agenda alongside daily schedules.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/YourFeature`).
3. Commit your changes and push to the branch.
4. Open a pull request to merge into the `main` branch.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgments
Special thanks to:
- **Auth0** for the authentication library.
- **Google** for the Calendar API.
- The open-source community for providing valuable tools and resources.
