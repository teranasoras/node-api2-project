
const express = require('express');

const Posts = require('./data/db');

const server = express();

server.use(express.json());
console.log(Posts)
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.get('/api/posts', (req, res) => {
  Posts.find(req.query)
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  });
});

server.get('/api/posts/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  });
});


// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub


server.get('/api/comments', (req, res) => {
    Posts.findcomments(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the comments',
      });
    });
  });


server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});