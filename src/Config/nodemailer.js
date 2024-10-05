import nodemailer from 'nodemailer';
import User from '../Models/user.model.js';



export function sendEmail(task){


  console.log('Task object:', task); // Log the task object
  console.log('Task object:', task.name,task.description,task.dueDate);

const transporter = nodemailer.createTransport({
    service: 'gmail', // you can use other services like 'hotmail', 'smtp', etc.
    auth: {
        user: 'sabhi8637@gmail.com', // your email
        pass: 'wmla cmjg eexi ugyc' // your email password or an app password
    }

});

// Set up email data
const mailOptions = {
  from: 'kingabhi6848@gmail.com', // sender address
  to: task.email, // recipient's email address
  subject: `Your Task "${task.name}" Has Been Successfully Added`, // Subject line
  text: `Hello,\n\nYour task "${task.name}" has been successfully added to your to-do list.\n\nDescription: ${task.description}\nDue Date: ${task.dueDate}\n\nThank you for using our service!`, // plain text body
  html: `
      <h3>Hello,</h3>
      <p>Your task <strong>"${task.name}"</strong> has been successfully added to your to-do list.</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p>Thank you for using our service!</p>
  ` // HTML body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
});
}