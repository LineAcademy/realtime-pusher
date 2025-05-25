// pages/index.js
import { useEffect } from 'react';
import Pusher from 'pusher-js';

export default function Home() {
  useEffect(() => {
    const pusher = new Pusher('978be05ea3e289a18d99', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');

    channel.bind('my-event', (data) => {
      const query = encodeURIComponent(data.message);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📺 الزائر: التاب هيظهر تلقائي لما الأدمن يبعت</h1>
    </div>
  );
}
