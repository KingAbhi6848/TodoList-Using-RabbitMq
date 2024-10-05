import User from "../Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Replace with your actual secret key

export default class UserController {
   
  signup(req, res) {
    return res.render('signup'); 
  }

  signin(req, res) {
    return res.render('signin'); 
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10); 
      await User.create({ name, email, password: hashedPassword });
      
      console.log('User created');
      return res.redirect('/user/signin');
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).send("Error creating user");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      console.log(req.body);
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }

      // Store user email in session
      req.session.user = user;

      console.log('User logged in:', user);
      return res.redirect('/'); // Redirect to the homepage or dashboard after login
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).send('Server error');
    }
  }

  logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Could not log out');
      }
      res.redirect('/user/signin'); // Redirect to the homepage after logout
    });
  }
}
