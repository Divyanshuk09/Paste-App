# Paste-App

Paste-App is a web application designed to allow users to easily share text snippets, such as code or notes, in a simple and efficient way. This app provides a user-friendly interface for creating, viewing, and managing pastes.

## Features

- **Create Pastes**: Create new pastes with syntax highlighting for various programming languages.
- **View Pastes**: View pastes in a clean and readable format.
- **Manage Pastes**: Edit or delete your pastes as needed.
- **Shareable Links**: Generate shareable links for each paste.
- **User Authentication**: Secure user authentication to manage your pastes.
- **Search Functionality**: Search through pastes using keywords.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Bootstrap

## Installation

To run this application locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Divyanshuk09/Paste-App.git
    cd Paste-App
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

4. **Start the application**:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register or log in to your account.
3. Create a new paste by clicking on the "New Paste" button.
4. Fill in the details and save your paste.
5. Share the generated link with others to view your paste.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [Divyanshuk09](https://github.com/Divyanshuk09).