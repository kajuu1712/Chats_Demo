//Connecting to mongo DB
const mongoose = require('mongoose');
const Chat = require("./models/chats.js");

main()
    .then(() => console.log("Connected to the database."))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

let allChats = [
    {
      from: "alice@example.com",
      to: "bob@example.com",
      msg: "Hey Bob, are we still on for the meeting tomorrow?",
      created_at: new Date("2025-05-08T10:30:00Z")
    },
    {
      from: "john.doe@gmail.com",
      to: "jane.smith@yahoo.com",
      msg: "I'll send over the files by tonight. Stay tuned!",
      created_at: new Date("2025-04-28T14:45:00Z")
    },
    {
      from: "admin@company.com",
      to: "support@helpdesk.com",
      msg: "Please reset the password for user ID 12345.",
      created_at: new Date("2025-05-01T09:10:00Z")
    },
    {
      from: "teacher@school.edu",
      to: "student@school.edu",
      msg: "Reminder: Submit your project by Friday evening.",
      created_at: new Date("2025-05-06T17:00:00Z")
    },
    {
      from: "mike@chatapp.com",
      to: "sara@chatapp.com",
      msg: "Good morning! How was your weekend?",
      created_at: new Date("2025-05-07T08:20:00Z")
    }
  ];
  
Chat.insertMany(allChats);