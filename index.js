const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

let { open } = require('sqlite');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

console.log(__dirname);

//************************
let db;
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Exercise 1: Get All Games
async function fetchAllGames() {
  let query = 'select * from games';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    let results = await fetchAllGames();
    if (results.games.length === 0)
      return res.status(404).json({ message: 'No entry found' });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// exercise 2: Get Game by ID
async function fetchAllGamesById(id) {
  let query = 'select * from games where id = ?';
  let response = await db.all(query, [id]);
  return { games: response };
}

app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchAllGamesById(id);
    if (results.games.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 3: Get Games by Genre
async function fetchAllGamesByGenre(genre) {
  let query = 'select * from games where genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/details/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let results = await fetchAllGamesByGenre(genre);
    if (results.games.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 4: Get Games by Platform
async function fetchAllGamesByPlatform(platform) {
  let query = 'select * from games where platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/details/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchAllGamesByPlatform(platform);
    if (results.games.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 5: Get Games Sorted by Rating
async function sortGamesByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let results = await sortGamesByRating();
    if (results.games.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 6: Get All Players
async function fetchAllPlayers() {
  let query = 'select * from players';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    let results = await fetchAllPlayers();
    if (results.players.length === 0)
      return res.status(404).json({ message: 'No entry found' });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// Exercise 7: Get Player by ID
async function fetchAllPlayersById(id) {
  let query = 'select * from players where id = ?';
  let response = await db.all(query, [id]);
  return { players: response };
}

app.get('/players/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchAllPlayersById(id);
    if (results.players.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Exercise 8: Get Players by Platform
async function fetchAllPlayersByPlatform(platform) {
  let query = 'select * from players where platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchAllPlayersByPlatform(platform);
    if (results.players.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 9: Get Players Sorted by Rating
async function sortPlayersByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let results = await sortPlayersByRating();
    if (results.players.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 10: Get All Tournaments
async function fetchAllTournament() {
  let query = 'select * from tournaments';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    let results = await fetchAllTournament();
    if (results.tournaments.length === 0)
      return res.status(404).json({ message: 'No entry found' });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// Exercise 11: Get Tournament by ID
async function fetchAllTournamentById(id) {
  let query = 'select * from tournaments where id = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchAllTournamentById(id);
    if (results.tournaments.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 12: Get Tournaments by Game ID
async function fetchAllTournamentByGameId(id) {
  let query = 'select * from tournaments where gameId = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/game/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchAllTournamentByGameId(id);
    if (results.tournaments.length === 0)
      return res.status(404).json({ message: 'no entry found' });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Exercise 13: Get Tournaments Sorted by Prize Pool
async function sortTournamentsByPrizePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let results = await sortTournamentsByPrizePool();
    if (results.tournaments.length === 0)
      return res.status(404).json({ message: 'No entry found' });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// ----------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
