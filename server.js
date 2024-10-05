import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import userRoute from './src/Routes/user.route.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Serve static files
app.use(express.static('./src/Public'));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); // Use absolute path

// Use EJS layouts
app.use(expressEjsLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 180 * 60 * 1000 // 3 hours
  }
}));

// Routes
app.use('/', todoRoute);
app.use('/user', userRoute);

// Start the server
const PORT = 9000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
