# TypeStream

Welcome to TypeStream! This project utilizes various frameworks and tools to create a seamless software development experience.

### Used Frameworks

### Testing

- [Jest](https://jestjs.io/): A delightful JavaScript Testing Framework with a focus on simplicity.
- [Vitest](https://vitest.dev/): A Node library to automate the browser, supports multiple browsers (Chromium, Firefox, WebKit).

### Backend

- [Express](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.

### ORM (Object-Relational Mapping)

- [Prisma](https://www.prisma.io/): A modern database toolkit for Node.js and TypeScript.

### Frontend

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/): Declarative routing for React.js.

### Additional Tools

- [ESLint](https://eslint.org/): Find and fix problems in your JavaScript/TypeScript code.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.

# Getting Started

Follow these steps to set up and run the project on your local machine:

1. **Install Dependencies**

```bash
npm install --legacy-peer-deps
```

2. **Prisma Migration**

```bash
npm run prisma-migrate
```

3. **Generate Prisma Client**

```bash
npm run prisma-generate
```

4. **Create and Seed Database**

```bash
npm run prisma-seed
```

5. **Run Server**

```bash
npm run server
```

6. **Run Server**

```bash
npm run dev
```

7. **Run Tests**

```bash
npm run test
```

## Login Credentials

- [Email] <user@softwareEngeneering.de>
- [Username] IKnowYourPassword
- [Password] 123456

# Environment Variables Configuration

To run this project successfully, it is necessary to create an `.env` file in the root directory of your project. This file should contain all the necessary environment variables required for configuring the application.

## Steps to Create the `.env` File

1. Create a new file in the root directory of your project and name it `.env`.
2. Add the following environment variables to the `.env` file:

```env
DATABASE_URL="file:./dev.db"
ORIGIN_URL='http://localhost:5173' 
ORIGIN_SERVER_URL='http://127.0.0.1:3000/'
```

### Important Note on `ORIGIN_URL`

- `ORIGIN_URL` should be the URL that you see in your browser after starting the application with `npm run dev`. This is the URL where your frontend application will be accessible.
- Depending on your operating system (OS) and the configuration of your development environment, you might need to adjust this URL. The default URL is `http://localhost:5173`, but it may vary based on the port settings or specific setup of your system.
