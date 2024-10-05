import Todo from "../Models/todo.model.js";
import sendNotification from "../Config/publisher.js";

export default class TodoController {
  
  // Get all todos for the authenticated user
  async getAllByEmail(req, res) {
    
    try {
      const userId = req.session.user._id; // Assuming you have user ID in session
      const tasks = await Todo.find({ userId }); // Query by userId
      console.log("tasks",tasks)
      return res.render('todolist', { tasks: tasks }); // Pass todos to the view
    } catch (error) {
      console.error('Error fetching todos:', error);
      return res.status(500).send('Server error');
    }
  }

  // Add a new todo
  async add(req, res) {
    const { name, dueDate, description } = req.body;
    
    try {
      const newTodo = await Todo.create({
        userId: req.session.user._id, // Store userId in the todo
        name,
        dueDate,
        description
      });
      
      console.log('New Todo created:', newTodo);
      const message = {
        email:req.session.user.email,
        name:newTodo.name,
        description:newTodo.description,
        dueDate:newTodo.dueDate
      }
      sendNotification(message);
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
      return res.redirect('/'); // Redirect after adding a todo
    } catch (error) {
      console.error('Error creating todo:', error);
      return res.status(500).send('Error creating todo');
    }
  }

  // Delete a todo by ID
  async delete(req, res) {
    const { id } = req.params; // Assuming you get the ID from the route params
    
    try {
      await Todo.findByIdAndDelete(id); // Delete todo by ID
      return res.redirect('/');
    } catch (error) {
      console.error('Error deleting todo:', error);
      return res.status(500).send('Error deleting todo');
    }
  }
}
