import { Link } from 'react-router-dom';
import { type User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

interface NavbarProps {
  user: User | null;
}

function Navbar({ user }: NavbarProps) {
  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        {/* TODO: Replace with your app name - Module 5 pattern */}
        <Link to="/">🗺️ 50 States Explorer</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/travels">Explore States</Link>

        {user ? (
          <>
            <span className="nav-email">{user.email}</span>
            <button onClick={handleSignOut} className="btn btn-secondary">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;