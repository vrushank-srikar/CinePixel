const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const app = express();

// ____________________________________________________________
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect('mongodb://localhost:27017/movies');

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    duration: { type: Number, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});
const Movie = mongoose.model('Movie', movieSchema);

// middleware for admin authentication
function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/login');
}

// ___________________________ Login Routes ___________________________

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const adminUsername = 'admin';
    const adminPassword = '123';

    if (username === adminUsername && password === adminPassword) {
        req.session.isLoggedIn = true;
        return res.redirect('/admin');
    }
    res.status(401).render('invalidlog', { message: 'Invalid username or password. Please try again.' });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ error: 'Logout failed' });
        }
        res.redirect('/login');
    });
});

// ___________________________ Admin Routes ___________________________

app.get('/admin', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.post('/admin', isAuthenticated, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ error: 'Server error', details: error.message });
    }
});

app.get('/admin/view', isAuthenticated, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('adminView', { movies });
    } catch (error) {
        res.status(500).render('error', { error: 'Server error', details: error.message });
    }
});
app.post('/deleteMovie', isAuthenticated, async (req, res) => {
    try {
        const movieId = req.body.movieId; // Get the movie ID from the form
        await Movie.findByIdAndDelete(movieId); // Delete the movie from the database

        console.log(`Movie with ID ${movieId} deleted.`);
        res.redirect('/admin/view'); // Redirect to the admin view page
    } catch (error) {
        console.error('Error deleting movie:', error.message);
        res.status(500).render('error', { message: 'Failed to delete movie.', details: error.message });
    }
});

// ___________________________ Viewer Routes ___________________________

app.get('/uploads', async (req, res) => {
    try {
        const { title } = req.query;

        // check if the title is empty
        if (!title || title.trim() === '') {
            return res.status(400).render('error', { message: 'Empty input provided' });
        }

        // check if the movie exists in the database
        const movie = await Movie.findOne({ title });
        if (!movie) {
            return res.status(404).render('error', { message: 'Movie not found' });
        }

        // render the movie details if found
        res.render('post', { post: movie });
    } catch (error) {
        res.status(500).render('error', { message: 'Server error', details: error.message });
    }
});



  
app.get('/sub', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sub.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// ______________________________________________________________________________
const port=8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });