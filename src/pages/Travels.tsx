import { useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { type TravelVlog } from '../types';
import TravelForm from '../components/TravelForm';

interface TravelsProps {
  user: User | null;
}

function Travels({ user }: TravelsProps) {
  const [travels, setTravels] = useState<TravelVlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTravel, setEditingTravel] = useState<TravelVlog | null>(null);

  // List of all 50 US states
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  // Fetch ONLY the authenticated user's travel vlogs
  useEffect(() => {
    if (user) {
      fetchTravels();
    } else {
      setLoading(false);
      setTravels([]);
    }
  }, [user]); // Re-fetch when user changes

  async function fetchTravels() {
    try {
      setLoading(true);
      // Filter by user_id to only get current user's travels
      const { data, error } = await supabase
        .from('travel_vlog')
        .select('*')
        .eq('user_id', user?.id)  // KEY CHANGE: Filter by user_id
        .order('date_started', { ascending: false });

      if (error) throw error;
      setTravels(data || []);
    } catch (err) {
      console.error('Error fetching travels:', err);
      setError('Failed to load your travel vlogs. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(travelData: Partial<TravelVlog>) {
    try {
      setError(null);
      
      if (editingTravel) {
        // When updating, ensure user owns this record
        const { error } = await supabase
          .from('travel_vlog')
          .update(travelData)
          .eq('id', editingTravel.id)
          .eq('user_id', user?.id); // Add user_id check for security

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('travel_vlog')
          .insert([{ ...travelData, user_id: user?.id }]);

        if (error) throw error;
      }

      await fetchTravels();
      setShowForm(false);
      setEditingTravel(null);
    } catch (err) {
      console.error('Error saving travel:', err);
      setError('Failed to save travel vlog. Please try again.');
    }
  }

  async function handleDelete(id: number) {
    try {
      // Only delete if user owns this record
      const { error } = await supabase
        .from('travel_vlog')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id); // Add user_id check for security

      if (error) throw error;
      await fetchTravels();
    } catch (err) {
      console.error('Error deleting travel:', err);
      setError('Failed to delete travel vlog. Please try again.');
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function renderStars(rating: number | null) {
    if (!rating) return 'Not rated';
    return <span className="stars">{'⭐'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>;
  }

  // Get unique states that the current user has visited
  const visitedStates = [...new Set(travels.map(travel => travel.state_name))];

  // If not logged in, show message
  if (!user) {
    return (
      <div>
        <div className="products-header">
          <h1>US States Travel Explorer</h1>
        </div>
        <div className="empty-state">
          <p>Please sign in to view your travel stories.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading your travel adventures...</div>;
  }

  if (showForm || editingTravel) {
    return (
      <TravelForm
        travel={editingTravel}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingTravel(null);
          setError(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="products-header">
        <h1>My US States Travel Explorer</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          + Add Your Travel Story
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Simple 50 States List - Shows only user's visited states */}
      <div style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '32px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#1e293b' }}>
          Your Visited States
          <span style={{ fontSize: '14px', color: '#64748b', marginLeft: '12px' }}>
            {visitedStates.length} / 50 states visited
          </span>
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
          gap: '8px'
        }}>
          {usStates.map(state => {
            const hasVisits = visitedStates.includes(state);
            return (
              <div
                key={state}
                style={{
                  padding: '8px',
                  backgroundColor: hasVisits ? '#2563eb' : '#f1f5f9',
                  color: hasVisits ? '#fff' : '#475569',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: hasVisits ? '500' : 'normal',
                  textAlign: 'center'
                }}
              >
                {state} {hasVisits && '✓'}
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#64748b', textAlign: 'center' }}>
          Blue states are where you've traveled!
        </p>
      </div>

      {/* Travel Stories List - Only user's own stories */}
      <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#1e293b' }}>
        My Travel Stories
      </h2>

      {travels.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any travel stories yet!</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            Save Your First Travel Story
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {travels.map((travel) => (
            <div key={travel.id} className="product-card">
              <h3>{travel.state_name}</h3>
              <p><strong>Cities:</strong> {travel.cities_visited.join(', ')}</p>
              <p><strong>Duration:</strong> {travel.duration_days} days</p>
              <p><strong>Activities:</strong> {travel.activities.join(', ')}</p>
              <p><strong>Rating:</strong> {renderStars(travel.rating)}</p>
              <p><strong>Dates:</strong> {formatDate(travel.date_started)} - {formatDate(travel.date_ended)}</p>
              {travel.notes && <p><strong>Notes:</strong> {travel.notes}</p>}
              
              {/* Show Edit/Delete buttons since these are all user's own entries */}
              <div className="product-actions">
                <button 
                  onClick={() => setEditingTravel(travel)} 
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(travel.id)} 
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Travels;
