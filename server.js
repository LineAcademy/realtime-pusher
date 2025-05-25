// server.js 

const express = require('express');
const next = require('next');
const http = require('http');               // ← تأكد من هذا السطر
const { Server: IOServer } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new IOServer(httpServer, {
    cors: { origin: '*' }
  });

  // parsers
  server.use(express.json());

  // Socket.IO – استقبال اتصالات
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);
  });

  // API لبث الرسائل
  server.post('/api/broadcast', (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }
    io.emit('broadcast-message', { message });
    return res.status(200).json({ success: true });
  });

  // أي طلب ثاني يديره Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
