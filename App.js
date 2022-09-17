import http from 'http';
import { fork } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url));

//Creating and listening to the server
http
  .createServer(async (req, res) => {
    //Accepting all the origins and https methods to avoid CORS issues
    cors({
      origin: '*',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    })
    const child = fork(__dirname + '/ChildProcess.js'); // Doing child_process using fork in ChildProcess.js

    //listening to the message from the process which was sent in ChildProcess.js.
    child.on('message', (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(data);
        res.end();
    });
  })
  .listen(3000);
