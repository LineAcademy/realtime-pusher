import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    await pusher.trigger('my-channel', 'my-event', {
      message,
    });

    return res.json({ status: 'Message sent' });
  }

  res.status(405).end();
}
