import { useState, useEffect } from 'react';

export default function Home() {
  const [dragons, setDragons] = useState([]);
  const [username, setUsername] = useState(''); // User input
  const [loading, setLoading] = useState(false);

  const fetchDragons = async () => {
    if (!username) return;
    setLoading(true);
    const res = await fetch(`/api/dragons?username=${username}`);
    const data = await res.json();
    setDragons(data.slice(0, 200));
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🐉 Dragon Cave Hatchery</h1>
      <input
        type="text"
        placeholder="Enter Dragon Cave username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchDragons} style={{ marginLeft: '10px' }}>
        Load Dragons
      </button>

      {loading && <p>Loading dragons...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
        {dragons.map((dragon) => (
          <a
            key={dragon.code}
            href={`https://dragcave.net/view/${dragon.code}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '10px' }}
          >
            <img
              src={`https://dragcave.net/image/${dragon.code}.gif`}
              alt={dragon.name || dragon.code}
              width={100}
              height={50}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
