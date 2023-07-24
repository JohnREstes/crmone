OneCRM - Simple CRM Application
OneCRM is a simple Customer Relationship Management (CRM) application built using Node.js, Express, and MongoDB. The application allows users to manage customer requests, track tickets, and resolve issues efficiently. It includes authentication using Google OAuth, a dashboard to display all requests, a search functionality, and a notification system to keep users informed about new tickets.

Features
Google Authentication: Users can sign in to the application using their Google account, providing a secure and convenient login method.

Dashboard: After successful login, users are directed to the dashboard, which displays a table with all current requests. The table includes various details such as ID, type, name, tag, owner, deadline, status, and action buttons for editing and deleting requests.

Request Management: Users can add new requests using a form that allows them to select the type, tag, owner, deadline, and status of the request. They can also edit existing requests from the dashboard.

Search Functionality: The dashboard includes a search bar that allows users to search for specific requests by name. The search is case-insensitive and updates dynamically as users type.

Notifications: Users are notified whenever they are assigned as the owner of a new request. The notification message includes the request's type and name. Unread notifications are indicated on a separate notifications page.

How to Use
Installation: Clone the repository and run npm install to install the required dependencies.

Environment Variables: Create a .env file and set the following environment variables:

MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
PORT=3000
Run the Application: Start the server by running npm start. The application will be accessible at http://localhost:3000.

Credits
The OneCRM application was developed by Raghav Agarwal. It utilizes Node.js, Express, MongoDB, and Google OAuth for authentication.
