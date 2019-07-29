const express = require('express');
const massive = require('massive');
const users = require('./controllers/users.js'); 
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments.js');

//const comments = require('./controllers/comments.js');

massive({
  host: 'localhost',
  port: 5432,
  database: 'node3',
  user: 'postgres',
  password: 'node3db',
}).then(db => {
  const app = express();

  app.set('db', db);

  app.use(express.json());

//users
  app.post('/api/users', users.create);
  app.get('/api/users', users.list);
  app.get('/api/users/:id', users.getById);
  app.get('/api/users/:id/profile', users.getProfile);
  app.get('/api/protected/data', users.getData);
  app.post('/api/login', users.login);
//posts
  app.post('/api/new-post', posts.create);
  app.get('/api/post/:postId', posts.getPost);
  app.get('/api/posts', posts.fetchPosts);
  app.patch('/api/edit-post/:id', posts.update);

//comments

  app.post('/api/new-comment', comments.add);
  app.patch('/api/edit-comment/:id', comments.update);

  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`Server listening d(-.-)b  on port ${PORT}`);
  }); 
}).catch(console.error);
