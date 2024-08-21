import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid'


import Blog from './mongose.js';
import { Server } from 'socket.io';

mongoose.connect('mongodb://127.0.0.1:27017/datauser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
let select=[]
let store = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});
 app.get('/login', (req, res) => {
   res.json({name:store});
});

// // Uncomment this and update if needed
  app.get('/signup', async (req, res) => {
    const users = await Blog.find({}, 'firstname');

      // Map over the users to get an array of all 'firstname' values
      const usernames = users.map(user => user.firstname);
      let change=req.body.userchnge
      console.log(change)

      // Send the array of usernames as the response
      res.json({names:usernames});
 });

app.post('/login', async (req, res) => {
 
 let emailid=req.body.email
 let password=req.body.password
  const user = await Blog.findOne({ password, emailid});
  if (user) {
    store.length = 0;
    // select.length=0
    
    store.push(user.firstname);
 
     
    res.json({ success: true, redirectUrl: "http://localhost:5173/chat",username:user.firstname});
   
  }
  else{
    res.json({success:false,message:"usere not found "})
  }
 
});

app.post('/signup', async (req, res) => {
  let firstname = req.body.firstname;
  let password = req.body.password;
  let emailid = req.body.email;
  let lastname = req.body.lastname;
 
  const userExists = await Blog.findOne({ emailid });
  console.log(userExists)
  if (userExists) {
    console.log("already registered");
    res.json({success:false,message:"user already registered"});
  } else {
    const schema = new Blog({
      firstname: req.body.firstname,
      password: req.body.password,
      emailid:req.body.email,
      lastname: req.body.lastname,
    });
    res.json({success:true});
    await schema.save();
   
  }
});



const server = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

const connections = new Map();

const io = new Server(server, {

  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    connectionStateRecovery: {}
  }

});

io.on('connection', (socket) => {
  console.log('a user connected');

  //   // Generate a unique ID
  const uniqueID1 = uuidv4();
  //  // Define or get the `store` variable as needed
  const uniqueID2 = uniqueID1 + store;
  const uniqueID3 = uniqueID2.substring(uniqueID1.length); // Adjust substring length based on uniqueID1 length

  connections.set(uniqueID3, socket);



  console.log(`A user connected with ID: ${uniqueID3}`);

  // Handle 'chat message' event
  socket.on('chat message', (msgData) => {
 
    const { send,change1 } = msgData;
  //  console.log(send)
  //  console.log(change1)
    const targetSocket = connections.get(change1);
      if (targetSocket) {
      targetSocket.emit('chat message',`${uniqueID3} : ${send}`);
    
      
 } else {
      console.log(`Socket ID ${uniqueID3} not found`);
   }
    //Emit message to all clients except the sender
  //  socket.broadcast.emit('chat message', `${uniqueID3} : ${send}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User with ID ${uniqueID3} disconnected`);
    connections.delete(uniqueID3); // Remove socket from connections map
  });
});

// Start the server (adjust port as needed)
