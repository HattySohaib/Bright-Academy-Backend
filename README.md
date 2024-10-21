
# Bright Academy Backend

This is the backend service for the Bright Academy application, implemented using Node.js and Express.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/HattySohaib/Bright-Academy-Backend.git
   ```

2. Change into the project directory:
   ```sh
   cd Bright-Academy-Backend
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   S3_BUCKET_NAME=your-s3-bucket-name
   ```

## Usage

To run the project:

```sh
npm start
```

This will start the server using `nodemon` on the port specified in the `.env` file.

## Scripts

- `start`: Runs the application with `nodemon`.
- `test`: Runs the test scripts (currently not specified).

## Dependencies

- **@aws-sdk/client-s3**: AWS SDK for S3.
- **@aws-sdk/s3-request-presigner**: AWS SDK for S3 request presigner.
- **bcrypt**: Library for hashing passwords.
- **cors**: Middleware for enabling CORS.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: Library for working with JSON Web Tokens.
- **mongodb**: MongoDB driver for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **multer**: Middleware for handling `multipart/form-data` (file uploads).

## License

This project is licensed under the ISC License.
```

You can further customize this README as needed.
