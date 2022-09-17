import http from 'http';
import { fork } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url));

http
  .createServer(async (req, res) => {
    cors({
      origin: '*',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    })
    const child = fork(__dirname + '/ChildProcess.js');
    child.on('message', (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(data);
        res.end();
    });
  })
  .listen(3000);
