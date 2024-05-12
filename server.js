const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Database variable
let db = [];

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// POST request to add a joke to the database
app.post('/', (req, res) => {
    const joke = req.body;
    db.push(joke);
    res.json(db);
});

// GET request to return all jokes
app.get('/', (req, res) => {
    res.json(db);
});

// PATCH request to update a joke by ID
app.patch('/joke/:id', (req, res) => {
    const id = req.params.id;
    const updatedJoke = req.body;
    db = db.map(joke => {
        if (joke.id === id) {
            return { ...joke, ...updatedJoke };
        }
        return joke;
    });
    const updatedJokeIndex = db.findIndex(joke => joke.id === id);
    res.json(db[updatedJokeIndex]);
});

// DELETE request to delete a joke by ID
app.delete('/joke/:id', (req, res) => {
    const id = req.params.id;
    const deletedJokeIndex = db.findIndex(joke => joke.id === id);
    const deletedJoke = db.splice(deletedJokeIndex, 1);
    res.json(deletedJoke);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
