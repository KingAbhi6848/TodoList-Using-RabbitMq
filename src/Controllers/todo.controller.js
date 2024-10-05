import Todo from "../Models/todo.model.js";
import sendNotification from "../Config/publisher.js";

export default class TodoController {
  
  async getAllByEmail(req, res) {
    try {
      const userId = req.session.user._id;
      const tasks = await Todo.find({ userId });
      console.log("tasks", tasks);
      return res.render('todolist', { tasks: tasks });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async add(req, res) {
    const { name, dueDate, description } = req.body;
    
    try {
      const newTodo = await Todo.create({
        userId: req.session.user._id,
        name,
        dueDate,
        description
      });
      
      console.log('New Todo created:', newTodo);
      const message = {
        email: req.session.user.email,
        name: newTodo.name,
        description: newTodo.description,
        dueDate: newTodo.dueDate
      };
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
      
      return res.redirect('/');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    
    try {
      await Todo.findByIdAndDelete(id);
      return res.redirect('/');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
}
