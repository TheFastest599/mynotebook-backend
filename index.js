const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
// Will be used for remind me function
const { Worker } = require('worker_threads');
const worker = new Worker('./worker.js');

connectToMongo();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/api/contactus', require('./routes/contactus'));

// setInterval(async () => {
//   console.log('Hey');
// }, 1000);

// main.js

// Listen for messages from the worker thread
worker.on('message', message => {
  console.log('Message from worker script: ', message);
});
worker.postMessage('Main is on!');

app.listen(port, () => {
  console.log(`MyNotebook Apps listening at http://localhost:${port}`);
});
