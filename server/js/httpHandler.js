const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  const { backgroundImageFile } = module.exports;

  if (req.method === 'GET') {

    if (req.url === '/background.jpg') {
      fs.readFile(backgroundImageFile, (err, data) => {
        if (err) {
          console.log('IN HERE');
          res.writeHead(404, headers);
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(data);
          res.end();
        }
      });
    }

    if (req.url === '/move') {
      res.writeHead(200, headers);
      const direction = messageQueue.dequeue();

      if (direction) {
        res.write(direction);
      }
      res.end();
    }
  }

  if (req.method === 'POST') {
    res.writeHead(201, headers);

    req.on('data', (data) => {
      console.log(data);

      const background = multipart.getFile(data);

      console.log(background);

      fs.writeFile(backgroundImageFile, background.data, () => {
        console.log('Writing File');
      });
    })
    res.end();
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

   next(); // invoke next() at the end of a request to help with testing!
};
