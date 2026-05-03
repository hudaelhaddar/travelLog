import { useState } from 'react';
import { type TravelVlog } from '../types';

interface TravelFormProps {
  travel: TravelVlog | null;
  onSave: (data: Partial<TravelVlog>) => void;
  onCancel: () => void;
}

function TravelForm({ travel, onSave, onCancel }: TravelFormProps) {
  // TODO: Add useState for each field - Based on template pattern
  const [stateName, setStateName] = useState(travel?.state_name ?? '');
  const [citiesVisited, setCitiesVisited] = useState(travel?.cities_visited?.join(', ') ?? '');
  const [durationDays, setDurationDays] = useState(travel?.duration_days ?? 1);
  const [activities, setActivities] = useState(travel?.activities?.join(', ') ?? '');
  const [rating, setRating] = useState(travel?.rating?.toString() ?? '');
  const [notes, setNotes] = useState(travel?.notes ?? '');
  const [dateStarted, setDateStarted] = useState(travel?.date_started ?? '');
  const [dateEnded, setDateEnded] = useState(travel?.date_ended ?? '');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // TODO: Validate fields - Based on template pattern
    if (!stateName.trim()) {
      setError('State name is required');
      return;
    }
    if (!citiesVisited.trim()) {
      setError('At least one city is required');
      return;
    }
    if (durationDays <= 0) {
      setError('Duration must be greater than 0 days');
      return;
    }
    if (!activities.trim()) {
      setError('At least one activity is required');
      return;
    }
    if (!dateStarted) {
      setError('Start date is required');
      return;
    }
    if (!dateEnded) {
      setError('End date is required');
      return;
    }
    if (new Date(dateEnded) < new Date(dateStarted)) {
      setError('End date cannot be before start date');
      return;
    }

    // Convert comma-separated strings to arrays
    const citiesArray = citiesVisited.split(',').map(city => city.trim()).filter(city => city);
    const activitiesArray = activities.split(',').map(activity => activity.trim()).filter(activity => activity);

    // TODO: Call onSave with field values - Based on template pattern
    onSave({
      state_name: stateName,
      cities_visited: citiesArray,
      duration_days: durationDays,
      activities: activitiesArray,
      rating: rating ? Number(rating) : null,
      notes: notes || null,
      date_started: dateStarted,
      date_ended: dateEnded,
    });
  }

  return (
    <div className="form-container">
      <h2>{travel ? 'Edit Your Journey' : 'Add New Travel Journey'}</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* TODO: Add form fields - Based on template pattern */}
        <div className="form-group">
          <label htmlFor="stateName">State Name *</label>
          <input
            id="stateName"
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            placeholder="e.g., California, New York, Texas"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cities">Cities Visited * (comma-separated)</label>
          <input
            id="cities"
            type="text"
            value={citiesVisited}
            onChange={(e) => setCitiesVisited(e.target.value)}
            placeholder="e.g., Los Angeles, San Francisco, San Diego"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (days) *</label>
          <input
            id="duration"
            type="number"
            min="1"
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="activities">Activities * (comma-separated)</label>
          <input
            id="activities"
            type="text"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            placeholder="e.g., hiking, sightseeing, surfing, museums"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-5 stars)</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select rating</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateStarted">Start Date *</label>
          <input
            id="dateStarted"
            type="date"
            value={dateStarted}
            onChange={(e) => setDateStarted(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateEnded">End Date *</label>
          <input
            id="dateEnded"
            type="date"
            value={dateEnded}
            onChange={(e) => setDateEnded(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Personal Notes</label>
          <textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Save your memories, tips, or highlights from this trip..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {travel ? 'Save Changes' : 'Add Journey'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TravelForm;