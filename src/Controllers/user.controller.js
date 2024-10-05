import User from "../Models/user.model.js";
import bcrypt from 'bcrypt';


export default class UserController {
  
  signup(req, res) {
    return res.render('signup',{errors:null});
  }

  signin(req, res) {
    return res.render('signin',{error:null});
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('signup', { errors: [{ msg: "Email already in use" }] });
            }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      
      console.log('User created');
      return res.redirect('/user/signin');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      console.log(req.body);
      if (!user) {
        return res.render('signin',{error: "Invalid Email or Password"});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.render('signin',{error: "Invalid Email or Password"});
      }

      req.session.user = user;

      console.log('User logged in:', user);
      return res.redirect('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.error('Could not log out:', err);
      }
      res.redirect('/user/signin');
    });
  }
}
