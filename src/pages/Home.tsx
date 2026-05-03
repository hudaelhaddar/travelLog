import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <h1>🗺️ 50 States Explorer</h1>
      <p>Discover travel stories from all 50 US states! See where people have traveled, what they did, and get inspired for your next adventure.</p>
      
      <div style={{ marginTop: '32px', marginBottom: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/travels" className="btn btn-primary">Explore All 50 States</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up to Share</Link>
      </div>

      <div style={{ 
        background: '#fff', 
        padding: '24px', 
        borderRadius: '12px', 
        marginTop: '48px',
        textAlign: 'left',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>✨ Features:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>✓</span>
            🗺️ Browse travel stories from all 50 states - no login required!
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>✓</span>
            📍 See which states have been visited by our community
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>✓</span>
            🎯 Filter stories by state to plan your next trip
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>✓</span>
            ⭐ Rate travel experiences (1-5 stars)
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>✓</span>
            ✏️ Sign in to share your own travel adventures
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;