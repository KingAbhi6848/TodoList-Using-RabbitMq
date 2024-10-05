import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import userRoute from './src/Routes/user.route.js';
import session from 'express-session';
import db from './src/Config/mongoose.js';
import todoRoute from './src/Routes/todo.route.js';
// import jwtAuth from './src/Middlewares/jwt.middleware.js';
import auth from './src/Middlewares/auth.middleware.js';
import MongoStore from 'connect-mongo';
import { closeConnection } from './src/Config/rabbitmq.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Serve static files
app.use(express.static('./src/Public'));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
// Middleware to parse JSON bodies
app.use(express.json());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); // Use absolute path

// Use EJS layouts
app.use(expressEjsLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // Replace with your MongoDB connection string
    collectionName: 'sessions', // Optional: Specify the collection name
  }),
  cookie: { secure: false ,
    maxAge: 180 * 60 * 1000
  }
}))

app.use('/',todoRoute);
app.use('/user', userRoute);


process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing connection...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing connection...');
  await closeConnection();
  process.exit(0);
});


// Start the server
app.listen(9000, () => {
  console.log('Server is running on http://localhost:9000');
});
