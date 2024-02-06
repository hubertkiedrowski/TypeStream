import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import session from "express-session";
import { createUser } from "./prisma/utils/createUser.js";
import { createPoint } from "./prisma/utils/createPoints.js";
/**
 * This is the server.js file for a software engineering project.
 * It contains the implementation of various routes and endpoints for handling user registration, login, session management, and data retrieval.
 * The server is built using Express.js and interacts with a PostgreSQL database using Prisma ORM.
 * The routes handle operations such as creating new users, retrieving user information, retrieving leaderboard scores, and managing user sessions.
 * The file also includes utility functions for creating users and points in the database.
 * @fileoverview Server implementation for the software engineering project.
 * @module server
 */

const app = express();
const port = 3000;
const prisma = new PrismaClient();
app.use(
  cors({
    origin: process.env.origin_URL || "http://localhost:5173",
    credentials: true,
    headers: ["Content-Type", "Authorization", "Access-Control-Allow-Headers"],
  })
);

app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({
    name: "connect.sid",
    secret: "5203",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: "None",
      secure: false,
    },
  })
);

/**
 * Retrieves the user by his unique ID.
 * @typedef {Object} User
 * @property {number} id - The unique identifier of the user.
 */
app.get("/users/:userID"),
  async (req, res) => {
    const userID = Number(req.params.userID);
    if (userID > 0) {
      const user = await prisma.user.findFirst({
        where: { id: userID },
      });
      res.json(user);
    } else if (userID == 0) {
      const user = await prisma.user.findMany();
      res.json(user);
    }
  };

/**
 * Returns all Users.
 * @typedef {Object} User
 */
app.get("/users/", async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(user);
});

/**
 * Retrieves the top scores from the database.
 *
 * @returns {<Array<Object>>} An array of objects representing the top scores, including user information.
 */
app.get("/points/leaderboard/:topX", async (req, res) => {
  const topX = Number(req.params.topX);
  try {
    const topScores = await prisma.point.findMany({
      take: topX,
      orderBy: {
        score: "desc", // Sortiere absteigend nach Punktestand
      },
      include: {
        user: true, // Dies nimmt die Benutzerinformationen mit auf
      },
    });
    res.json(topScores);
  } catch (error) {
    console.error("Fehler beim Abfragen der Punktestände:", error);
    res.status(500).json({ error: "Serverfehler" });
  }
});

/**
 * Retrieves the top 5 user scores for a given user ID.
 *
 * @param {number} userID - The ID of the user.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user scores, including the associated user information.
 */
app.get("/points/:userID", async (req, res) => {
  const userID = Number(req.params.userID);

  try {
    const userScores = await prisma.point.findMany({
      take: 5,
      where: { userId: userID },
      orderBy: {
        score: "desc",
      },
      include: {
        user: true,
      },
    });
    res.json(userScores);
  } catch (error) {
    console.error("Fehler beim Abfragen der Punktestände:", error);
    res.status(500).json({ error: "Serverfehler" });
  }
});

app.get("/get-session", (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

/**
 * creates a new score for the given userID.
 * @type {number}
 */
app.post("/newPoints/:userID", async (req, res) => {
  const userID = Number(req.params.userID);
  const score = req.body.score;
  const timePlayed = req.body.timePlayed;
  console.log(userID, score, req.params.userID);
  try {
    await createPoint(score, userID, timePlayed);

    res
      .status(200)
      .json({ message: "Score erfolgreich aktualisiert", userScore });
  } catch (error) {
    console.error("Fehler beim Abfragen des neuen Scores:", error);
    res.status(500).json({ error: "Serverfehler" });
  }
});

/**
 * Retrieves Username by ID.
 * @typedef {Object} User
 * @property {number} id  - The unique identifier of the user.
 */
app.get("/username/:userID", async (req, res) => {
  const userID = Number(req.params.userID);

  const user = await prisma.user.findFirst({
    where: { id: Number(userID) },
  });
  res.json({ firstName: user.userName });
});

/**
 * Retrieves firstname by ID.
 * @typedef {Object} User
 * @property {number} id - The unique identifier of the user.
 */
app.get("/firstname/:userID", async (req, res) => {
  const userID = Number(req.params.userID);

  const user = await prisma.user.findFirst({
    where: { id: Number(userID) },
  });
  res.json({ firstName: user.firstName });
});

/**
 * Retrieves lastName by ID.
 * @typedef {Object} User
 * @property {number} id - The unique identifier of the user.
 */
app.get("/lastname/:userID", async (req, res) => {
  const userID = Number(req.params.userID);

  const user = await prisma.user.findFirst({
    where: { id: Number(userID) },
  });
  res.json({ lastName: user.lastName });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Regist
app.post("/regist", async (req, res) => {
  const { firstName, lastName, email, userName, password, repeatpassword } =
    req.body;

  if (
    password == repeatpassword &&
    firstName != "" &&
    lastName != "" &&
    email != "" &&
    userName != "" &&
    password != "" &&
    repeatpassword != ""
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Speicher User in datenbank
      const user = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: "Benutzer erfolreich Registriert!" });
      console.log("Regist erfolgreich!");
    } catch (error) {
      console.log("Fehler beim Registrieren:", error);
      res.status(500).json({ message: "Interner Serverfehler" });
    }
  } else {
    res.status(400).json({ message: "Passwörter stimmen nicht überein" });
  }
});

// Serverseite
app.post("/set-session", (req, res) => {
  req.session.user = {
    id: req.body.id,
    email: req.body.email,
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  res.sendStatus(200);
});

// Geschützte Ressource
app.get("/myProfile", (req, res) => {
  // Überprüfen Sie, ob der Benutzer authentifiziert ist
  if (req.session.user) {
    res.json({ message: "Zugriff gewährt", user: req.session.user });
  } else {
    // Benutzer nicht authentifiziert - senden Sie einen 401 Unauthorized-Status
    res.status(401).json({ message: "Unbefugter Zugriff" });
  }
});

// Login
app.post("/login", async (req, res) => {
  if (req.session.user) {
    return res.status(403).json({ message: "Du bist bereits eingeloggt" });
  }

  const authHeader = req.headers.authorization;

  // Logge den Authorization-Header
  console.log("Authorization-Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Basic")) {
    return res.status(401).json({ message: "Ungültige Anmeldeinformationen" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [email, userName, password] = credentials.split(":");

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        userName: userName,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Ungültige Anmeldeinformationen2" });
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      req.session.userID = user.id;
      res
        .status(200)
        .json({ email: user.email, userName: user.userName, id: user.id });
      console.log("Anmeldung erfolgreich!");
    } else {
      res.status(401).json({ message: "Ungültige Anmeldeinformationen!" });
    }
  } catch (error) {
    console.error("Fehler bei der Anmeldung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

/**
 * Represents a newly created point.
 * @typedef {Object} NewPoint
 * @property {number} score - The score of the point.
 * @property {string} userID - The ID of the user who created the point.
 */
app.post("/create/points", async (req, res) => {
  const userID = req.session.id;
  const score = req.body.score;
  console.log(userID, score, req.session.id);
  try {
    const newPoint = await createPoint(score, userID);

    if (newPoint != null) {
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Represents a newly created user.
 * @typedef {Object} newUser
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */
app.post("/create/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);

    if (newUser != null) {
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Fehler beim Logout:", err);
      res.status(500).json({ message: "Interner Serverfehler" });
    } else {
      res.json({ message: "Logout erfolgreich" });
    }
  });
});
