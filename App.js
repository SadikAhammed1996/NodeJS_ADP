import http from 'http';
import { fork } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

http
  .createServer(async (req, res) => {
    const child = fork(__dirname + '/ChildProcess.js');
    child.on('message', (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(data);
        res.end();
    });
  })
  .listen(3000);
