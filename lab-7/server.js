const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))
// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

server.post('/submit', (req, res) => {
  const { noun, verb } = req.body;
  if (!noun || !verb ) {
      res.send(`
        <h1>Submission Failed</h1>
        <p>Please fill out ALL fields</p>
        <a href="/">Go Back to Form</a>
      `);
      return;
  };
  const madLibOne = `Hello, ${noun} ... `;
  const madLibTwo = `My favorite activity is to ${verb} ... `;
  const madLib = `${madLibOne}\n${madLibTwo}`;
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/">Go Back to Form</a>
  `);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))
// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local

let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}
server.listen(port, () => console.log('Ready on localhost!'))