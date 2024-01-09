import express from 'express'
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
const app = express()
const port = 3000
const prisma = new PrismaClient();
app.use(cors({
  origin: 'http://localhost:5173', // Ersetze dies durch den tatsächlichen Ursprung deiner React-Anwendung
  credentials: true,
}));
app.use(express.json());


// app.post('/users/:userID', async (req, res) => {
//   const userID = Number(req.params.userID)
//   try {
//     const user = await prisma.user.findFirst({
//       where: { id: userID },
//     });

//     if (user) {
//       res.json({ user });
//     } else {
//       res.status(404).json({ error: 'Benutzer nicht gefunden' });
//     }
//   } catch (error) {
//     console.error('Fehler beim Abfragen des Benutzers:', error);
//     res.status(500).json({ error: 'Serverfehler' });
//   }
// });

app.get('/users/:userID', async (req, res) => {
  const userID = Number(req.params.userID)
  if (userID > 0) {
    const user = await prisma.user.findFirst({
      where: { id: userID },
    })
    res.json(user)
  } else if (userID == 0) {
    const user = await prisma.user.findMany()
    res.json(user)
  }
})

// Findet die obersten x Punktestände 
app.get('/points/leaderboard/:topX', async (req, res) => {
  const topX = Number(req.params.topX);

  try {
    const topScores = await prisma.point.findMany({
      take: topX,
      orderBy: {
        score: 'desc', // Sortiere absteigend nach Punktestand
      },
      include: {
        user: true, // Dies nimmt die Benutzerinformationen mit auf
      },
    });
    res.json({ data: topScores });
  } catch (error) {
    console.error('Fehler beim Abfragen der Punktestände:', error);
    res.status(500).json({ error: 'Serverfehler' });
  }
});



// Alle Punktestände eines Benutzers
app.get('/points/:userID', async (req, res) => {
  const userID = Number(req.params.userID);

  try {
    const userScores = await prisma.point.findMany({
      where: { userId: userID }, // Verwenden Sie hier 'userId' anstelle von 'id'
      orderBy: {
        score: 'desc', // Sortiere absteigend nach Punktestand
      },
    });

    res.json({ data: userScores });
  } catch (error) {
    console.error('Fehler beim Abfragen der Punktestände:', error);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

//get username
app.get('/username/:userID', async (req, res) => {
  const userID = Number(req.params.userID)

  const user = await prisma.user.findFirst({
    where: { id: Number(userID) },
  })
  res.json({ firstName: user.userName })
})

//get firstname
app.get('/firstname/:userID', async (req, res) => {
  const userID = Number(req.params.userID)

  const user = await prisma.user.findFirst({
    where: { id: Number(userID) },
  })
  res.json({ firstName: user.firstName })
})

//get lastname
app.get('/lastname/:userID', async (req, res) => {
  const userID = Number(req.params.userID)

  const user = await prisma.user.findFirst({
    where: { id: Number(userID) },
  })
  res.json({ lastName: user.lastName })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
