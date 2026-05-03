import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <h1>TravelLog</h1>
      <p>Track the states you’ve visited, save memories, and add short descriptions of your experiences all in one place.</p>
      
      <div style={{ marginTop: '32px', marginBottom: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/travels" className="btn btn-primary">Explore All 50 States</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up to Save Adventures</Link>
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
        <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Features:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>-</span>
            Browse the 50 States
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>-</span>
            See which states you have visited
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>-</span>
            Rate travel experiences
          </li>
          <li style={{ marginBottom: '8px', paddingLeft: '24px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>-</span>
            Sign in to save your own travel adventures
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;